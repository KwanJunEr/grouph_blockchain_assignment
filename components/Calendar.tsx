"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

type SelectedDate = {
  id: string
  date: Date
  title: string
}

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([])
  const [newEventTitle, setNewEventTitle] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get day names for header
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  const handleDateClick = (day: Date) => {
    setSelectedDate(day)
    setDialogOpen(true)
  }

  const addEvent = () => {
    if (selectedDate && newEventTitle.trim()) {
      const newEvent: SelectedDate = {
        id: Date.now().toString(),
        date: selectedDate,
        title: newEventTitle,
      }
      setSelectedDates([...selectedDates, newEvent])
      setNewEventTitle("")
      setDialogOpen(false)
    }
  }

  const removeEvent = (id: string) => {
    setSelectedDates(selectedDates.filter((event) => event.id !== id))
  }

  const getEventsForDate = (date: Date) => {
    return selectedDates.filter((event) => isSameDay(event.date, date))
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day) => (
              <div key={day} className="text-center font-medium text-muted-foreground">
                {day}
              </div>
            ))}

            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-start-${index}`} className="h-12 rounded-md p-1" />
            ))}

            {daysInMonth.map((day) => {
              const events = getEventsForDate(day)
              const hasEvents = events.length > 0

              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "h-12 rounded-md p-1 transition-colors hover:bg-accent hover:text-accent-foreground",
                    isToday(day) && "border border-primary",
                    !isSameMonth(day, currentMonth) && "text-muted-foreground opacity-50",
                  )}
                  onClick={() => handleDateClick(day)}
                >
                  <div className="flex h-full flex-col">
                    <span className={cn("text-right text-sm", hasEvents && "font-bold")}>{format(day, "d")}</span>
                    {hasEvents && (
                      <div className="mt-auto">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
              <div key={`empty-end-${index}`} className="h-12 rounded-md p-1" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Selected Dates</CardTitle>
          <CardDescription>
            {selectedDates.length === 0
              ? "No dates selected. Click on a date to add an event."
              : `You have ${selectedDates.length} event${selectedDates.length !== 1 ? "s" : ""}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            {selectedDates.length === 0 ? (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <p>No events yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDates
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event) => (
                    <div key={event.id} className="flex items-start justify-between rounded-md border p-3">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{format(event.date, "MMMM d, yyyy")}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeEvent(event.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription>
              {selectedDate && `Create a new event for ${format(selectedDate, "MMMM d, yyyy")}`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="event-title">Event Title</Label>
              <Input
                id="event-title"
                placeholder="Enter event title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addEvent}>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

