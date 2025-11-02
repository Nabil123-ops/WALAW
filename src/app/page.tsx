"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Moon,
  Sun,
  Menu,
  X,
  Plane,
  Hotel,
  Car,
  Smartphone,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Music,
  Star,
  Shield,
  Zap,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import AuthModal from "@/components/auth-modal"
import TravelPayoutsWidgetsPopup from "@/components/travelpayouts-widgets-popup"
import AIChat from "@/components/ai-chat"
import { useAuth } from "@/contexts/auth-context"

export default function TzeegoHomePage() {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("Flights")
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const tabs = [
    { name: "Flights", icon: Plane },
    { name: "Hotels", icon: Hotel },
    { name: "Rent cars", icon: Car },
    { name: "E sim", icon: Smartphone },
  ]

  const faqData = [
    {
      question: "How does Tzeego find the best flight prices?",
      answer:
        "Tzeego is a metasearch engine that scans hundreds of airline websites and online travel agencies in real-time to find the best available prices. We don't sell tickets directly but show you all available options so you can choose the best deal.",
    },
    {
      question: "How does the cashback program work?",
      answer:
        "When you book through Tzeego after signing up for an account, you automatically earn cashback on eligible bookings. The cashback percentage varies by booking type. Your cashback balance accumulates in your account and can be redeemed for future travel or withdrawn to your bank account once it reaches the minimum threshold.",
    },
    {
      question: "Is there a fee to use Tzeego?",
      answer:
        "No, Tzeego is completely free to use. We earn commission from our partners when you book through our site, which allows us to offer our service at no cost to you while still providing cashback rewards.",
    },
    {
      question: "How do I set up price alerts?",
      answer:
        "After performing a flight search, look for the 'Create Price Alert' button near the search results. You can specify your desired price range and we'll notify you via email or app notification when prices change. You need to be logged in to use this feature.",
    },
  ]

  const features = [
    {
      icon: Star,
      title: "Best Price Guarantee",
      description: "Compare prices from hundreds of travel sites to find the best deals",
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Your data is protected with industry-leading security measures",
    },
    {
      icon: Zap,
      title: "Instant Confirmation",
      description: "Get immediate booking confirmation and e-tickets",
    },
    {
      icon: Award,
      title: "Cashback Rewards",
      description: "Earn cashback on every booking to save even more",
    },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 backdrop-blur-md ${
          isDark ? "bg-gray-900/95 border-gray-800" : "bg-white/95 border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <a href="#" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 transition-transform group-hover:scale-110 duration-300">
                <Image
                  src="/images/tzeego-logo.jpg"
                  alt="Tzeego Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold hidden sm:block">
                <span className="text-red-500">Tze</span>
                <span className={isDark ? "text-white" : "text-blue-600"}>ego</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["Home", "About Us", "FAQ", "Contact"].map((item) => (
              <a
                key={item}
                href={item === "Home" ? "#" : `#${item.toLowerCase().replace(" ", "-")}`}
                className={`font-medium transition-all hover:text-blue-500 hover:scale-105 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`transition-transform hover:scale-110 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/dashboard")}
                  className={isDark ? "text-gray-300 hover:text-white" : "text-blue-600 hover:text-blue-700"}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className={isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-700"}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setAuthModal("login")}
                  className={isDark ? "text-gray-300 hover:text-white" : "text-blue-600 hover:text-blue-700"}
                >
                  Login
                </Button>
                <Button 
                  onClick={() => setAuthModal("signup")} 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={isDark ? "text-gray-300" : "text-gray-700"}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className={isDark ? "text-gray-300" : "text-gray-700"}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <div
              className={`fixed right-0 top-0 h-full w-64 p-6 transition-colors duration-300 shadow-2xl ${
                isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              } border-l`}
            >
              <div className="flex justify-between items-center mb-8">
                <a href="#" className="flex items-center space-x-2">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/images/tzeego-logo.jpg"
                      alt="Tzeego Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold">
                    <span className="text-red-500">Tze</span>
                    <span className={isDark ? "text-white" : "text-blue-600"}>ego</span>
                  </span>
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={isDark ? "text-gray-300" : "text-gray-700"}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <nav className="flex flex-col space-y-4 mb-8">
                {["Home", "About Us", "FAQ", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={item === "Home" ? "#" : `#${item.toLowerCase().replace(" ", "-")}`}
                    className={`font-medium py-2 transition-colors hover:text-blue-500 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col space-y-4">
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        router.push("/dashboard")
                        setIsMobileMenuOpen(false)
                      }}
                      className={`w-full justify-start ${isDark ? "text-gray-300 hover:text-white" : "text-blue-600 hover:text-blue-700"}`}
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className={`w-full justify-start ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-700"}`}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setAuthModal("login")
                        setIsMobileMenuOpen(false)
                      }}
                      className={`w-full justify-start ${isDark ? "text-gray-300 hover:text-white" : "text-blue-600 hover:text-blue-700"}`}
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        setAuthModal("signup")
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-red-600 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 md:w-32 md:h-32 animate-pulse">
                <Image
                  src="/images/tzeego-logo.jpg"
                  alt="Tzeego"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Your Journey Begins with <span className="text-yellow-300">Tzeego</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Compare flights, hotels, cars & eSIMs from hundreds of providers. Get the best deals with cashback rewards!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Searching
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-xl transition-all transform hover:scale-105"
                onClick={() => setAuthModal("signup")}
              >
                Join for Cashback
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? "text-white" : "text-gray-900"}`}>
            Why Choose Tzeego?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  isDark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDark ? "bg-blue-900/50" : "bg-blue-100"
                  }`}>
                    <feature.icon className={`h-8 w-8 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {feature.title}
                  </h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search-section" className={`py-16 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Search & Compare
            </h2>
            <p className={`text-center mb-8 text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Find the best deals on flights, hotels, rental cars, and eSIMs - all in one place
            </p>

            <Card className={`shadow-2xl ${isDark ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
              <CardContent className="p-6">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-300 border-b-2 ${
                        activeTab === tab.name
                          ? "border-blue-600 text-blue-600"
                          : isDark
                            ? "border-transparent text-gray-400 hover:text-gray-300"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </div>

                {/* Widget Content */}
                <TravelPayoutsWidgetsPopup activeTab={activeTab} isDark={isDark} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className={`py-16 ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${isDark ? "text-white" : "text-gray-900"}`}>
              About Tzeego
            </h2>
            <div className={`space-y-6 text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              <p>
                Tzeego is your ultimate travel companion, designed to make finding and booking your perfect trip easier
                than ever. As a comprehensive metasearch platform, we aggregate and compare prices from hundreds of
                airlines, hotels, car rental companies, and eSIM providers worldwide.
              </p>
              <p>
                Our mission is simple: to help you save time and money while planning your travels. Whether you're
                booking a quick weekend getaway or planning an extended international adventure, Tzeego ensures you get
                the best possible deals without the hassle of visiting multiple websites.
              </p>
              <p>
                What sets us apart is our cashback rewards program. Unlike traditional booking platforms, we share our
                success with you. Every time you book through Tzeego, you earn cashback that can be used for future
                trips or withdrawn to your bank account. It's our way of saying thank you for choosing us as your travel
                partner.
              </p>
              <p>
                Join thousands of satisfied travelers who trust Tzeego to find them the best deals on flights, hotels,
                rental cars, and eSIMs. Start your journey with us today!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={`py-16 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? "text-white" : "text-gray-900"}`}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <Card
                  key={index}
                  className={`transition-all duration-300 hover:shadow-lg ${
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white"
                  }`}
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className={`w-full text-left p-6 flex justify-between items-center ${
                        isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      } transition-colors`}
                    >
                      <span className={`font-semibold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${openFaq === index ? "rotate-180" : ""} ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className={`px-6 pb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {faq.answer}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-16 ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? "text-white" : "text-gray-900"}`}>
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className={isDark ? "bg-gray-700 border-gray-600" : "bg-gray-50"}>
                <CardContent className="p-6">
                  <h3 className={`text-xl font-semibold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className={`h-5 w-5 mt-1 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                      <div>
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Address</p>
                        <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                          123 Travel Street, Suite 100
                          <br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className={`h-5 w-5 mt-1 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                      <div>
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Phone</p>
                        <p className={isDark ? "text-gray-300" : "text-gray-600"}>+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className={`h-5 w-5 mt-1 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                      <div>
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Email</p>
                        <p className={isDark ? "text-gray-300" : "text-gray-600"}>support@tzeego.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
                    <p className={`font-medium mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Follow Us</p>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className={`transition-colors ${isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"}`}
                      >
                        <Facebook className="h-6 w-6" />
                      </a>
                      <a
                        href="#"
                        className={`transition-colors ${isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"}`}
                      >
                        <Instagram className="h-6 w-6" />
                      </a>
                      <a
                        href="#"
                        className={`transition-colors ${isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"}`}
                      >
                        <Music className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={isDark ? "bg-gray-700 border-gray-600" : "bg-gray-50"}>
                <CardContent className="p-6">
                  <h3 className={`text-xl font-semibold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Send us a Message
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        className={isDark ? "bg-gray-600 border-gray-500 text-white" : "bg-white"}
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        className={isDark ? "bg-gray-600 border-gray-500 text-white" : "bg-white"}
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        rows={4}
                        className={isDark ? "bg-gray-600 border-gray-500 text-white" : "bg-white"}
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/tzeego-logo.jpg"
                  alt="Tzeego"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">
                <span className="text-red-500">Tze</span>
                <span className={isDark ? "text-white" : "text-blue-600"}>ego</span>
              </span>
            </div>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              © 2025 Tzeego. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} />}

      {/* AI Chat */}
      <AIChat isDark={isDark} />
    </div>
  )
}
