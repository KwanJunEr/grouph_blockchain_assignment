import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full bg-black/90 text-white">
      <div className="mx-auto px-5 py-5">
        <div className="flex justify-between">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">MedChain</h3>
            
          </div>

          {/* Contact Info */}
          <div className="">
          <div className="flex space-x-4">
              <Link href="#" className="hover:text-white/60 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-white/60 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="hover:text-white/60 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-2 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">&copy; {new Date().getFullYear()} MedChain. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

