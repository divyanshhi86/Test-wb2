import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, BookOpen, Briefcase, Camera, Check, ChevronDown, ChevronLeft, 
  ChevronRight, ChevronUp, Clock, Copy, Cpu, CreditCard, Facebook, FilePen, 
  FileText, Gift, GraduationCap, Headphones, Heart, Home, Image as ImageIcon, 
  Instagram, Keyboard, LayoutGrid, Mail, MapPin, Megaphone, Menu, Filter, LayoutDashboard,
  MessageCircle, Minus, Monitor, Mouse, Package, Pen, PenTool, List,
  Pencil, Play, Plus, Printer, Search, Settings, Shield, 
  ShoppingBag, ShoppingCart, Smartphone, Sparkles, Square, Star, Layers,
  ThumbsUp, Trash2, Twitter, Upload, User, X, Youtube,
  CheckCircle2, Truck, RefreshCcw, MessageSquare, Box, Award, Calculator, Calendar, Layout, TableProperties
} from 'lucide-react';

import { GoogleGenAI } from "@google/genai";

// --- Constants & Data ---

const ALL_PRODUCTS = [
  // Stationery
  { id: 1, name: "Premium Fountain Pen", category: "Pens", brand: "Parker", price: 1299, originalPrice: 2599, discount: "50% off", rating: 4.9, img: "https://picsum.photos/seed/delta-pen-1/400/400", bestseller: true, inStock: true, view: "shop" },
  { id: 2, name: "Leather Bound Journal", category: "Notebooks", brand: "Moleskine", price: 850, originalPrice: 1060, discount: "20% off", rating: 4.8, img: "https://picsum.photos/seed/delta-journal-1/400/400", bestseller: true, inStock: true, view: "shop" },
  { id: 3, name: "Artist Sketch Set", category: "Art Supplies", brand: "Faber-Castell", price: 2100, originalPrice: 3000, discount: "30% off", rating: 5, img: "https://picsum.photos/seed/delta-art-1/400/400", bestseller: false, inStock: true, view: "shop" },
  { id: 4, name: "Ergonomic Desk Lamp", category: "Desk Accessories", brand: "Other", price: 3499, originalPrice: 3880, discount: "10% off", rating: 5, img: "https://picsum.photos/seed/delta-lamp-1/400/400", bestseller: false, inStock: true, view: "shop" },
  { id: 5, name: "Mechanical Pencil Set", category: "Pens", brand: "Staedtler", price: 450, originalPrice: 900, discount: "50% off", rating: 5, img: "https://picsum.photos/seed/delta-pencil-1/400/400", bestseller: true, inStock: true, view: "shop" },
  { id: 6, name: "Hardcover Planner", category: "Planners", brand: "Classmate", price: 1100, originalPrice: 2200, discount: "50% off", rating: 5, img: "https://picsum.photos/seed/delta-planner-1/400/400", bestseller: true, inStock: true, view: "shop" },
  { id: 7, name: "Gel Pen Multi-Color Pack", category: "Pens", brand: "Pilot", price: 750, originalPrice: 1500, discount: "50% off", rating: 4.8, img: "https://picsum.photos/seed/delta-gelpen-1/400/400", bestseller: false, inStock: true, view: "shop" },
  { id: 8, name: "Watercolor Paint Set", category: "Art Supplies", brand: "Camlin", price: 1200, originalPrice: 2400, discount: "50% off", rating: 4.9, img: "https://picsum.photos/seed/delta-watercolor-1/400/400", bestseller: false, inStock: true, view: "shop" },
  { id: 9, name: "Spiral Bound Notebook", category: "Notebooks", brand: "Classmate", price: 150, originalPrice: 300, discount: "50% off", rating: 5, img: "https://picsum.photos/seed/delta-notebook-1/400/400", bestseller: true, inStock: true, view: "shop" },
  { id: 10, name: "Professional Drawing Pencils", category: "Art Supplies", brand: "Staedtler", price: 950, originalPrice: 1900, discount: "50% off", rating: 4.8, img: "https://picsum.photos/seed/delta-drawing-1/400/400", bestseller: false, inStock: true, view: "shop" },
  { id: 11, name: "Executive Desk Organizer", category: "Desk Accessories", brand: "Other", price: 1800, originalPrice: 3600, discount: "50% off", rating: 4.9, img: "https://picsum.photos/seed/delta-organizer-1/400/400", bestseller: true, inStock: true, view: "shop" },
  { id: 12, name: "Calligraphy Ink Set", category: "Art Supplies", brand: "Other", price: 650, originalPrice: 1300, discount: "50% off", rating: 4.8, img: "https://picsum.photos/seed/delta-ink-1/400/400", bestseller: false, inStock: true, view: "shop" },
  { id: 13, name: "Premium Acrylic Paints", category: "Art Supplies", brand: "Other", price: 1500, originalPrice: 2000, discount: "25% off", rating: 4.7, img: "https://picsum.photos/seed/delta-art-2/400/400", bestseller: false, inStock: true, view: "shop" },
  { id: 14, name: "Dotted Grid Journal", category: "Notebooks", brand: "Other", price: 950, originalPrice: 1200, discount: "20% off", rating: 4.9, img: "https://picsum.photos/seed/delta-journal-2/400/400", bestseller: false, inStock: true, view: "shop" },
  { id: 15, name: "Technical Drawing Pens", category: "Pens", brand: "Other", price: 800, originalPrice: 1000, discount: "20% off", rating: 4.8, img: "https://picsum.photos/seed/delta-pen-2/400/400", bestseller: false, inStock: true, view: "shop" },
  { id: 16, name: "Luxury Wax Seal Kit", category: "Stationery Sets", brand: "Other", price: 2499, originalPrice: 4999, discount: "50% off", rating: 5, img: "https://picsum.photos/seed/delta-wax-1/400/400", bestseller: true, inStock: true, view: "shop" },
  { id: 17, name: "Premium Calligraphy Set", category: "Stationery Sets", brand: "Other", price: 3200, originalPrice: 4000, discount: "20% off", rating: 4.9, img: "https://picsum.photos/seed/delta-calli-1/400/400", bestseller: true, inStock: true, view: "shop" },
  { id: 18, name: "Leather Pencil Case", category: "Desk Accessories", brand: "Other", price: 1200, originalPrice: 1500, discount: "20% off", rating: 4.8, img: "https://picsum.photos/seed/delta-case-1/400/400", bestseller: false, inStock: true, view: "shop" },
  { id: 19, name: "A5 Dot Grid Journal", category: "Notebooks", brand: "Other", price: 899, originalPrice: 1199, discount: "25% off", rating: 4.9, img: "https://picsum.photos/seed/delta-journal-3/400/400", bestseller: false, inStock: true, view: "shop" },
  { id: 20, name: "Dual Tip Brush Pens", category: "Art Supplies", brand: "Other", price: 1800, originalPrice: 2400, discount: "25% off", rating: 4.7, img: "https://picsum.photos/seed/delta-brush-1/400/400", bestseller: true, inStock: true, view: "shop" },
  
  // Tech
  { id: 101, name: "Logitech MX Master 3S", category: "Mouse", brand: "Logitech", price: 9999, rating: 5, img: "https://picsum.photos/seed/tech-1/400/400", view: "tech" },
  { id: 102, name: "Razer BlackWidow V4 Pro", category: "Keyboards", brand: "Razer", price: 15999, rating: 5, img: "https://picsum.photos/seed/tech-2/400/400", view: "tech" },
  { id: 103, name: "Sony WH-1000XM5", category: "Headphones", brand: "Sony", price: 29999, rating: 5, img: "https://picsum.photos/seed/tech-3/400/400", view: "tech" },
  { id: 104, name: "Apple AirPods Pro (2nd Gen)", category: "Ear buds", brand: "Apple", price: 24900, rating: 5, img: "https://picsum.photos/seed/tech-4/400/400", view: "tech" },
  { id: 105, name: "Bose QuietComfort Earbuds II", category: "Ear buds", brand: "Bose", price: 25900, rating: 5, img: "https://picsum.photos/seed/tech-5/400/400", view: "tech" },
  { id: 106, name: "Sennheiser IE 200", category: "Wired earphones", brand: "Sennheiser", price: 14999, rating: 5, img: "https://picsum.photos/seed/tech-6/400/400", view: "tech" },
  { id: 107, name: "SteelSeries QcK Heavy", category: "Mouse pad", brand: "SteelSeries", price: 1999, rating: 5, img: "https://picsum.photos/seed/tech-7/400/400", view: "tech" },
  { id: 108, name: "JBL Tune 760NC", category: "Headphones", brand: "JBL", price: 5999, rating: 5, img: "https://picsum.photos/seed/tech-8/400/400", view: "tech" },
  { id: 109, name: "Boat Rockerz 450", category: "Headphones", brand: "Boat", price: 1499, rating: 5, img: "https://picsum.photos/seed/tech-9/400/400", view: "tech" },
  { id: 110, name: "Zebronics Zeb-Transformer", category: "Keyboards", brand: "Zebronics", price: 1299, rating: 5, img: "https://picsum.photos/seed/tech-10/400/400", view: "tech" },
  { id: 111, name: "Logitech G Pro X Superlight", category: "Mouse", brand: "Logitech", price: 12999, rating: 5, img: "https://picsum.photos/seed/tech-11/400/400", view: "tech" },
  { id: 112, name: "Razer DeathAdder V3 Pro", category: "Mouse", brand: "Razer", price: 13999, rating: 5, img: "https://picsum.photos/seed/tech-12/400/400", view: "tech" },
  { id: 113, name: "Corsair K70 RGB TKL", category: "Keyboards", brand: "Corsair", price: 11999, rating: 5, img: "https://picsum.photos/seed/tech-13/400/400", view: "tech" },
  { id: 114, name: "Samsung Galaxy Buds2 Pro", category: "Ear buds", brand: "Samsung", price: 17999, rating: 5, img: "https://picsum.photos/seed/tech-14/400/400", view: "tech" },
  { id: 115, name: "Boat Bassheads 225", category: "Wired earphones", brand: "Boat", price: 599, rating: 5, img: "https://picsum.photos/seed/tech-15/400/400", view: "tech" },
  { id: 116, name: "Razer Gigantus V2", category: "Mouse pad", brand: "Razer", price: 1499, rating: 5, img: "https://picsum.photos/seed/tech-16/400/400", view: "tech" },

  // Gifts
  { id: 201, name: "Customized Photo Mug", category: "Normal Gifts", for: "Friend", price: 499, rating: 4.8, img: "https://picsum.photos/seed/gift-1/600/800", desc: "A classic ceramic mug personalized with your favorite memories.", view: "gifts" },
  { id: 202, name: "Premium Leather Wallet", category: "Normal Gifts", for: "Senior", price: 1899, rating: 4.9, img: "https://picsum.photos/seed/gift-2/600/800", desc: "Handcrafted genuine leather wallet with RFID protection.", view: "gifts" },
  { id: 203, name: "Personalized Desk Organizer", category: "Stationery Gifts", for: "Teacher", price: 1200, rating: 4.7, img: "https://picsum.photos/seed/gift-3/600/800", desc: "Keep your workspace tidy with this custom engraved wooden organizer.", view: "gifts" },
  { id: 204, name: "Elegant Silk Scarf", category: "Normal Gifts", for: "Family", price: 950, rating: 4.6, img: "https://picsum.photos/seed/gift-4/600/800", desc: "Soft, luxurious silk scarf with intricate floral patterns.", view: "gifts" },
  { id: 205, name: "Engraved Fountain Pen Set", category: "Stationery Gifts", for: "Senior", price: 2500, rating: 5.0, img: "https://picsum.photos/seed/gift-5/600/800", desc: "A timeless writing instrument set for the distinguished professional.", view: "gifts" },
  { id: 206, name: "Handmade Scented Candles", category: "Normal Gifts", for: "Friend", price: 650, rating: 4.5, img: "https://picsum.photos/seed/gift-6/600/800", desc: "Soy-based candles with calming lavender and vanilla scents.", view: "gifts" },
  { id: 207, name: "Custom Name Diary", category: "Stationery Gifts", for: "Teacher", price: 450, rating: 4.8, img: "https://picsum.photos/seed/gift-7/600/800", desc: "A high-quality notebook with your name embossed on the cover.", view: "gifts" },
  { id: 208, name: "Digital Photo Frame", category: "Normal Gifts", for: "Family", price: 4500, rating: 4.9, img: "https://picsum.photos/seed/gift-8/600/800", desc: "Display thousands of photos in a beautiful high-resolution frame.", view: "gifts" },
  { id: 209, name: "Artistic Table Clock", category: "Normal Gifts", for: "Senior", price: 1500, rating: 4.7, img: "https://picsum.photos/seed/gift-9/600/800", desc: "A unique, modern clock design that doubles as a piece of art.", view: "gifts" },
  { id: 210, name: "Luxury Stationery Box", category: "Stationery Gifts", for: "Teacher", price: 3200, rating: 5.0, img: "https://picsum.photos/seed/gift-10/600/800", desc: "The ultimate collection for stationery lovers, presented in a premium box.", view: "gifts" }
];

const BLOG_CATEGORIES = [
  {
    title: "Gifting Ideas",
    blogs: [
      { id: "gift-1", title: "Personalized Memory Boxes: A Complete Guide", date: "JANUARY 15, 2024", img: "https://picsum.photos/seed/giftblog1/600/400", content: "Memory boxes are more than just containers; they are vessels for our most cherished moments. In this guide, we explore how to select the right materials, what to include, and how to personalize each box to make it truly unique. From etched glass to hand-painted wood, the possibilities are endless." },
      { id: "gift-2", title: "Why Custom Stationery Makes the Perfect Gift", date: "JANUARY 10, 2024", img: "https://picsum.photos/seed/giftblog2/600/400", content: "In a digital age, the tactile feel of luxury paper and the stroke of a fountain pen carry a weight that an email never can. Custom stationery allows the recipient to express their personality in every note they write. We'll delve into the world of monograms, paper weights, and ink choices." },
      { id: "gift-3", title: "Eco-Friendly Gifts: Style with a Conscious", date: "JANUARY 22, 2024", img: "https://picsum.photos/seed/giftblog5/600/400", content: "Choosing eco-friendly gifts is a powerful way to show you care for both the recipient and the planet. From recycled paper products to bamboo-based accessories, sustainable gifting is more stylish than ever. Learn how to identify truly green products and make ethical choices that don't compromise on luxury." }
    ]
  },
  {
    title: "Gift Decoration Ideas",
    blogs: [
      { id: "deco-1", title: "10 Creative Ways to Wrap Your Gifts", date: "FEBRUARY 02, 2024", img: "https://picsum.photos/seed/giftblog3/600/400", content: "Presentation is half the gift! Discover how to use sustainable materials, Japanese Furoshiki techniques, and even dried botanicals to create gift wrap that's almost too beautiful to open. These 10 ideas will elevate your gifting game for any occasion." },
      { id: "deco-2", title: "DIY Gift Tags and Decorative Ribbons", date: "FEBRUARY 14, 2024", img: "https://picsum.photos/seed/giftblog4/600/400", content: "Learn how to make your own gift tags using scraps of beautiful paper, stamps, and calligraphy. We also show you how to tie the perfect bow every time, and how to mix and match ribbon textures for a professional finish." },
      { id: "deco-3", title: "Using Natural Elements: A Rustic Approach", date: "FEBRUARY 25, 2024", img: "https://picsum.photos/seed/giftblog6/600/400", content: "Nature provides the most beautiful decorations for free. Discover how to incorporate pinecones, sprigs of eucalyptus, and even dried orange slices into your gift presentation. This rustic aesthetic is not only visually stunning but also offers a wonderful sensory experience through natural scents." }
    ]
  },
  {
    title: "Tech and AI related",
    blogs: [
      { id: "tech-1", title: "What Keyboard to Pick for Gaming (Budget Friendly)", date: "MARCH 05, 2024", img: "https://picsum.photos/seed/techblog1/600/400", content: "Gaming doesn't have to break the bank. We test 5 budget-friendly mechanical keyboards that offer great performance, RGB lighting, and robust build quality. Whether you prefer linear, tactile, or clicky switches, there's a budget option for you." },
      { id: "tech-2", title: "The Future of AI in Daily Stationery", date: "MARCH 12, 2024", img: "https://picsum.photos/seed/techblog2/600/400", content: "Can AI help you write better? We look at the emerging field of smart notebooks and AI-integrated writing tools that bridge the gap between analog thought and digital execution. Discover how your next notebook might help you organize your life." }
    ]
  },
  {
    title: "Top Brands for Earphone or Headphone",
    blogs: [
      { id: "audio-1", title: "Sony vs Bose: The Ultimate Headphones Battle", date: "APRIL 01, 2024", img: "https://picsum.photos/seed/audioblog1/600/400", content: "The age-old question: Sony WH-1000XM5 or Bose QuietComfort? We take a deep dive into noise cancellation, sound profiles, comfort for long listening sessions, and battery life to help you decide which one belongs on your ears." },
      { id: "audio-2", title: "Best Budget Wired Earphones in 2024", date: "APRIL 10, 2024", img: "https://picsum.photos/seed/audioblog2/600/400", content: "Wired audio is making a comeback! For those who value latency-free sound and never want to worry about charging, we've Rounded up the best In-Ear Monitors (IEMs) and classic wired buds that deliver audiophile quality under ₹2000." },
      { id: "audio-3", title: "Sennheiser vs Audio-Technica: The Studio Standard", date: "APRIL 20, 2024", img: "https://picsum.photos/seed/audioblog3/600/400", content: "When it comes to legendary studio sound, two names stand above the rest. We compare the Sennheiser HD 600 series with the Audio-Technica ATH-M series. Whether you're mixing tracks in a professional studio or just want the most accurate reproduction of your favorite album at home, we break down the soundstage, clarity, and build quality of these audio giants." }
    ]
  }
];

const PAGES = [
  { id: "home", name: "Home", desc: "Welcome to Delta Institute & Stationery Store. Explore our courses and shop.", view: "home" },
  { id: "shop", name: "Stationery Shop", desc: "Premium pens, notebooks, and art supplies for your creative journey.", view: "shop" },
  { id: "courses", name: "Professional Courses", desc: "Hands-on training in computer science, design, and more.", view: "courses" },
  { id: "services", name: "Tech Services", desc: "Expert computer repair, hardware upgrades, and software solutions.", view: "services" },
  { id: "blogs", name: "Blogs", desc: "Insights on gifting, tech, and creative living.", view: "blogs" },
  { id: "contact", name: "Contact Us", desc: "Get in touch with our team for support or inquiries.", view: "contact" },
  { id: "printing", name: "Printing Services", desc: "High-quality A4/A3 printing, photo printing, and PAN card services.", view: "printing" },
  { id: "tech", name: "Tech Products", desc: "Premium peripherals, keyboards, mice, and audio gear.", view: "tech" },
  { id: "gifts", name: "Gift Store", desc: "Curated and personalized gifts for every occasion.", view: "gifts" }
];

const CATEGORIES = [
  "Stationery", "Printing", "Gifts", "Tech Products", "Education", "Courses", "Services"
];

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const Chatbot = ({ setView }: { setView: (v: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hello! I'm Delta WB1, your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const systemInstruction = `
        You are "Delta WB1", the intelligent AI assistant for Delta Institute & Stationery Store.
        Your goal is to be helpful, human-like, and context-aware.
        
        WEBSITE CONTEXT:
        - Products: ${ALL_PRODUCTS.map(p => p.name).join(", ")}
        - Categories: ${CATEGORIES.join(", ")}
        - Pages: ${PAGES.map(p => p.name).join(", ")}
        - Services: Computer repair, hardware upgrades, software installation, A4/A3 printing, photo printing.
        - Location: Shop no.9 Vikas Nagar Kusmunda, Korba, CG.
        - Working Hours: 9:00 AM - 10:00 PM, Open All Week.
        
        GUIDELINES:
        1. Suggest relevant products if the user asks for something specific.
        2. Help users navigate. If they want to see something, suggest the page name.
        3. If a request is custom or unclear, guide them to the Contact page.
        4. Actively suggest: "Go to Contact page" or "Fill the form for better assistance" when appropriate.
        5. For custom orders or personal requests, ask clarifying questions first, then direct to the Contact form.
        6. Be conversational and not robotic.
        
        If the user wants to navigate, you can mention the page name clearly.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: userMsg }] }],
        config: { systemInstruction }
      });

      const botText = response.text || "I'm sorry, I'm having trouble connecting. Please try again later.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "I encountered an error. Please try again or visit our Contact page." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed right-8 bottom-8 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-black/5 flex flex-col overflow-hidden"
          >
            <div className="p-6 bg-delta-primary text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest leading-none">Delta WB1</h3>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">AI Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${m.role === 'user' ? 'bg-delta-primary text-white rounded-tr-none' : 'bg-white text-slate-700 shadow-sm border border-black/5 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-black/5 flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-black/5">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-delta-primary/20 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="w-12 h-12 bg-delta-primary text-white rounded-xl flex items-center justify-center hover:bg-delta-secondary transition-all shadow-lg shadow-delta-primary/20 disabled:opacity-50"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white border border-black/5 rounded-full shadow-2xl flex items-center justify-center text-slate-900 hover:text-delta-primary transition-all relative"
      >
        <MessageCircle size={24} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      </motion.button>
    </div>
  );
};

const AVATARS = [
  "https://picsum.photos/seed/skull/200",
  "https://picsum.photos/seed/croc/200",
  "https://picsum.photos/seed/ant/200",
  "https://picsum.photos/seed/ghost/200",
  "https://picsum.photos/seed/bunny/200",
  "https://picsum.photos/seed/bear/200",
  "https://picsum.photos/seed/flower/200",
  "https://picsum.photos/seed/monkey/200",
  "https://picsum.photos/seed/frog/200",
  "https://picsum.photos/seed/octopus/200",
  "https://picsum.photos/seed/mickey/200",
  "https://picsum.photos/seed/wolf/200",
  "https://picsum.photos/seed/rabbit/200",
  "https://picsum.photos/seed/bird/200",
  "https://picsum.photos/seed/cat/200",
  "https://picsum.photos/seed/bug/200"
];

// --- Components ---

const Avatar = ({ index, size = 32, className = "" }: { index: number, size?: number, className?: string }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div 
      className={`rounded-full overflow-hidden bg-slate-200 border border-black/10 flex items-center justify-center relative ${className}`}
      style={{ width: size, height: size }}
    >
      {loading && !error && <div className="absolute inset-0 bg-slate-200 animate-pulse" />}
      {error ? (
        <User size={size * 0.6} className="text-slate-400" />
      ) : (
        <img 
          src={AVATARS[index % AVATARS.length]} 
          alt="Avatar" 
          className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          referrerPolicy="no-referrer"
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      )}
    </div>
  );
};

const ProductDetailView = ({ product, onAddToCart, onToggleLike, isLiked, setView, allProducts, onProductClick }: any) => {
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");

  if (!product) return null;

  const relatedProducts = allProducts
    .filter((p: any) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16"
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
        <button onClick={() => setView("home")} className="hover:text-delta-primary transition-colors">Home</button>
        <ChevronRight size={12} />
        <span className="text-slate-900">Product details</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Images */}
        <div className="space-y-6">
          <div className="aspect-[4/5] bg-slate-50 rounded-[2.5rem] overflow-hidden border border-black/5">
            <img 
              src={product.img || `https://picsum.photos/seed/${product.id}/800/1000`} 
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-black/5 cursor-pointer hover:border-delta-primary transition-all">
                <img 
                  src={`https://picsum.photos/seed/${product.id + i}/400/400`} 
                  alt={`${product.name} ${i}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-full uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-slate-900">₹{product.price?.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-slate-300 line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Clock size={14} className="text-delta-primary" />
              <span>Order in <span className="text-slate-900">02:30:25</span> to get next day delivery</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Select Size</p>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold transition-all border ${
                    selectedSize === size 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => onAddToCart({...product, qty, size: selectedSize})}
              className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-delta-primary transition-all shadow-2xl shadow-slate-900/20"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => onToggleLike(product)}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all ${
                isLiked ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100'
              }`}
            >
              <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="space-y-4 pt-8 border-t border-slate-100">
            {/* Accordions */}
            <div className="border-b border-slate-100 pb-4">
              <button 
                onClick={() => setActiveAccordion(activeAccordion === "description" ? null : "description")}
                className="w-full flex items-center justify-between text-sm font-bold text-slate-900 uppercase tracking-widest"
              >
                <span>Description & Fit</span>
                {activeAccordion === "description" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <AnimatePresence>
                {activeAccordion === "description" && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-sm text-slate-500 leading-relaxed">
                      {product.description || `Experience the perfect blend of style and functionality with this premium ${product.name.toLowerCase()}. Crafted for those who appreciate the finer details in their creative or professional work. Features high-quality materials and ergonomic design for maximum comfort.`}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <button 
                onClick={() => setActiveAccordion(activeAccordion === "shipping" ? null : "shipping")}
                className="w-full flex items-center justify-between text-sm font-bold text-slate-900 uppercase tracking-widest"
              >
                <span>Shipping</span>
                {activeAccordion === "shipping" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <AnimatePresence>
                {activeAccordion === "shipping" && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 grid grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900">
                          <RefreshCcw size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Discount</p>
                          <p className="text-xs font-bold text-slate-900">Disc 50%</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900">
                          <Box size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Package</p>
                          <p className="text-xs font-bold text-slate-900">Regular Package</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900">
                          <Truck size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery Time</p>
                          <p className="text-xs font-bold text-slate-900">3-4 Working Days</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900">
                          <Clock size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimation Arrive</p>
                          <p className="text-xs font-bold text-slate-900">10 - 12 October 2024</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div className="pt-16 border-t border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-12">Rating & Reviews</h3>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <span className="text-8xl font-black text-slate-900">4,5</span>
              <span className="text-2xl font-bold text-slate-300 ml-2">/5</span>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">(50 New Reviews)</p>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-yellow-400 w-8">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-bold text-slate-900">{star}</span>
                  </div>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900 rounded-full" 
                      style={{ width: `${star === 5 ? 80 : star === 4 ? 15 : 5}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar index={0} size={48} />
                  <div>
                    <h4 className="font-bold text-slate-900">Alex Mathio</h4>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400">13 Oct 2024</span>
              </div>
              <p className="text-slate-500 leading-relaxed italic">
                "Delta's dedication to quality and customer satisfaction resonates strongly with today's consumers, positioning the brand as a responsible choice in the stationery world."
              </p>
              <div className="flex justify-center gap-2">
                <div className="w-8 h-1 bg-slate-900 rounded-full" />
                <div className="w-8 h-1 bg-slate-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="pt-16 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold text-slate-900 tracking-tight">You might also like</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {relatedProducts.map((p: any) => (
            <div 
              key={p.id} 
              onClick={() => { 
                onProductClick(p);
                setView("product-detail"); 
                window.scrollTo(0, 0); 
              }}
              className="group cursor-pointer space-y-4"
            >
              <div className="aspect-[3/4] bg-slate-50 rounded-[2rem] overflow-hidden border border-black/5 relative">
                <img 
                  src={p.img} 
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 group-hover:text-delta-primary transition-colors">{p.name}</h4>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "" : "text-slate-200"} />)}
                  <span className="text-[10px] font-bold text-slate-400 ml-1">4.0/5</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-slate-900">₹{p.price}</span>
                  {p.originalPrice && <span className="text-sm text-slate-300 line-through font-bold">₹{p.originalPrice}</span>}
                  {p.discount && <span className="text-[10px] font-black text-green-600">-{p.discount}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

import AdminView from './components/AdminView';

export default function App() {
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("ENG");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Dyvanshhi SN",
    email: "dyvanshhi.sn@gmail.com",
    phone: "+91 98765 43210",
    address: {
      houseNo: "123",
      street: "Delta Street",
      locality: "Stationery Hub",
      city: "New Delhi",
      state: "Delhi"
    },
    avatarIndex: 0
  });

  const [cart, setCart] = useState([
    { id: 1, name: "Premium Fountain Pen", price: 1299, qty: 1, img: "https://picsum.photos/seed/cart-0/100/100" },
    { id: 2, name: "Leather Bound Journal", price: 850, qty: 2, img: "https://picsum.photos/seed/cart-1/100/100" },
    { id: 3, name: "Artist Sketch Set", price: 2100, qty: 1, img: "https://picsum.photos/seed/delta-art-1/100/100" },
    { id: 4, name: "Mechanical Pencil Set", price: 450, qty: 3, img: "https://picsum.photos/seed/delta-pencil-1/100/100" }
  ]);

  const [liked, setLiked] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => item.name === product.name ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { 
        id: Date.now(), 
        ...product, 
        qty: 1, 
        img: product.img || `https://picsum.photos/seed/cart-${prev.length}/100/100` 
      }];
    });
    setIsCartOpen(true);
  };

  const toggleLike = (product: any) => {
    setLiked(prev => prev.find(item => item.id === product.id) 
      ? prev.filter(item => item.id !== product.id) 
      : [...prev, product]
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className={`min-h-screen flex selection:bg-delta-primary/20 selection:text-delta-primary ${view === 'admin' ? '' : 'bg-warm-bg'}`}>
      {view !== 'admin' && <Sidebar setView={setView} lang={lang} setLang={setLang} />}
      
      <div className="flex-1 flex flex-col min-w-0">
        {view !== 'admin' && (
          <Header 
            currentView={view} 
            setView={setView} 
            lang={lang} 
            setLang={setLang} 
            onCartClick={() => setView("cart")} 
            cartCount={cartCount}
            likedCount={liked.length}
            user={user}
            onProductClick={setSelectedProduct}
            onMenuClick={() => setIsCategoriesOpen(true)}
          />
        )}

        {view !== 'admin' && (
          <MobileMenu 
            isOpen={isCategoriesOpen} 
            onClose={() => setIsCategoriesOpen(false)} 
            setView={setView}
            lang={lang}
            setLang={setLang}
          />
        )}

        {view !== 'admin' && (
          <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            items={cart}
            onRemove={removeFromCart}
            onUpdateQty={updateQty}
            onViewCart={() => { setView("cart"); setIsCartOpen(false); }}
            likedItems={liked}
            onToggleLike={toggleLike}
          />
        )}

        <main className={view === 'admin' ? '' : 'pt-16'}>
          {view === "home" && <HomeView setView={setView} onAddToCart={addToCart} likedItems={liked} onToggleLike={toggleLike} isCategoriesOpen={isCategoriesOpen} setIsCategoriesOpen={setIsCategoriesOpen} onProductClick={(p: any) => { setSelectedProduct(p); setView("product-detail"); window.scrollTo(0, 0); }} />}
          {view === "shop" && <ShopView onAddToCart={addToCart} likedItems={liked} onToggleLike={toggleLike} onProductClick={(p: any) => { setSelectedProduct(p); setView("product-detail"); window.scrollTo(0, 0); }} />}
          {view === "admin" && <AdminView setView={setView} />}
          {view === "courses" && <CoursesView />}
          {view === "services" && <ServicesView setView={setView} />}
          {view === "contact" && <ContactView />}
          {view === "printing" && <PrintingView />}
          {view === "tech" && <TechView onAddToCart={addToCart} likedItems={liked} onToggleLike={toggleLike} onProductClick={(p: any) => { setSelectedProduct(p); setView("product-detail"); window.scrollTo(0, 0); }} />}
          {view === "gifts" && <GiftsView setView={setView} onAddToCart={addToCart} likedItems={liked} onToggleLike={toggleLike} onProductClick={(p: any) => { setSelectedProduct(p); setView("product-detail"); window.scrollTo(0, 0); }} />}
          {view === "blogs" && <BlogView setView={setView} onBlogClick={(b: any) => { setSelectedBlog(b); setView("blog-detail"); window.scrollTo(0, 0); }} />}
          {view === "blog-detail" && selectedBlog && <BlogDetailView blog={selectedBlog} setView={setView} onBlogClick={(b: any) => { setSelectedBlog(b); setView("blog-detail"); window.scrollTo(0, 0); }} />}
          {view === "cart" && <CartView items={cart} onRemove={removeFromCart} onUpdateQty={updateQty} setView={setView} likedItems={liked} onAddToCart={addToCart} onToggleLike={toggleLike} />}
          {view === "liked" && <LikedView items={liked} onAddToCart={addToCart} onToggleLike={toggleLike} onProductClick={(p: any) => { setSelectedProduct(p); setView("product-detail"); window.scrollTo(0, 0); }} />}
          {view === "dashboard" && <DashboardView user={user} setView={setView} />}
          {view === "profile" && <ProfileView user={user} setUser={setUser} setView={setView} />}
          {view === "coming-soon" && <ComingSoonView setView={setView} onBlogClick={(b: any) => { setSelectedBlog(b); setView("blog-detail"); window.scrollTo(0, 0); }} />}
          {view === "product-detail" && (
            <ProductDetailView 
              product={selectedProduct} 
              onAddToCart={addToCart} 
              onToggleLike={toggleLike} 
              isLiked={liked.some(item => item.id === selectedProduct?.id)}
              setView={setView}
              allProducts={ALL_PRODUCTS}
              onProductClick={setSelectedProduct}
            />
          )}
        </main>

        <Footer />
      </div>

      {/* Delta WB1 AI Assistant */}
      <Chatbot setView={setView} />

      {/* Side Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        tabIndex={0}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 w-14 h-16 bg-white/80 backdrop-blur-md border-l border-y border-white/50 rounded-l-2xl shadow-[-10px_0_30px_-10px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center group transition-all duration-300 hover:w-16"
        style={{ opacity: 1, transform: 'none' }}
      >
        <div className="relative">
          <ChevronLeft 
            size={24} 
            className="lucide lucide-chevron-left text-delta-primary group-hover:-translate-x-1 transition-transform" 
          />
        </div>
        <span className="text-[8px] font-black uppercase tracking-tighter mt-1 text-slate-400 group-hover:text-delta-primary transition-colors">
          Cart
        </span>
      </button>
    </div>
  );
}

// --- Sub-components ---

function Sidebar({ setView, lang, setLang }: any) {
  const [activeCategory, setActiveCategory] = useState("All Products");

  const categories = [
    { 
      name: "All Products", 
      icon: <List size={22} />,
      sub: [
        { name: "Stationery", view: "shop", icon: <Pencil size={18} /> },
        { name: "Printing", view: "printing", icon: <Printer size={18} /> },
        { name: "Gifts", view: "gifts", icon: <Gift size={18} /> },
        { name: "Tech Products", view: "tech", icon: <Mouse size={18} /> }
      ]
    },
    { 
      name: "Education", 
      icon: <BookOpen size={22} />,
      sub: [
        { name: "Courses", view: "courses", icon: <GraduationCap size={18} /> },
        { name: "Our Blogs", view: "blogs", icon: <FileText size={18} /> }
      ]
    },
    { 
      name: "Coming Soon", 
      icon: <ShoppingBag size={22} />,
      view: "coming-soon"
    },
    { 
      name: "Services", 
      icon: <Settings size={22} />,
      view: "services"
    },
    { 
      name: "Admin Panel", 
      icon: <LayoutDashboard size={22} />,
      view: "admin"
    }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[280px] border-r border-black/5 bg-white h-screen sticky top-0 z-50 p-6 overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-2 cursor-pointer mb-12" onClick={() => setView("home")}>
        <div className="w-10 h-10 bg-delta-primary rounded-lg flex items-center justify-center overflow-hidden">
          <img src="https://picsum.photos/seed/delta-logo-cat/200/200" alt="Delta Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-tighter text-delta-secondary leading-none">DELTA</span>
          <span className="text-[10px] font-bold text-delta-primary tracking-[0.1em] uppercase whitespace-nowrap">Institute & Stationery Store</span>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-4">Categories</h4>
          <div className="space-y-1">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <button 
                  onClick={() => {
                    if ((cat as any).view) {
                      setView((cat as any).view);
                      setActiveCategory(cat.name);
                    } else {
                      setActiveCategory(activeCategory === cat.name ? "" : cat.name);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${activeCategory === cat.name ? 'bg-warm-bg text-delta-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-delta-primary'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={activeCategory === cat.name ? 'text-black' : ''}>
                      {cat.icon}
                    </div>
                    <span className="text-base font-bold">{cat.name}</span>
                  </div>
                  {(cat as any).sub && (cat as any).sub.length > 0 && (
                    <ChevronDown size={18} className={activeCategory === cat.name ? '' : '-rotate-90'} />
                  )}
                </button>
                
                {activeCategory === cat.name && cat.sub && (
                  <div className="ml-6 space-y-1 py-2">
                    {cat.sub.map((sub, sIdx) => (
                      <button 
                        key={sIdx}
                        onClick={() => setView(sub.view)}
                        className="flex items-center gap-3 w-full px-4 py-2 rounded-xl text-left group hover:bg-slate-50 transition-all"
                      >
                        <div className="text-slate-400 group-hover:text-delta-primary transition-colors">{sub.icon}</div>
                        <span className={`text-sm font-bold group-hover:text-delta-primary transition-colors text-slate-500`}>
                          {sub.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-black/5">
        <div className="flex items-center gap-6 px-4 mb-4">
          <a href="#" className="text-slate-400 hover:text-delta-primary transition-all"><Instagram size={20} /></a>
          <a href="#" className="text-slate-400 hover:text-delta-primary transition-all"><MessageCircle size={20} /></a>
          <a href="#" className="text-slate-400 hover:text-delta-primary transition-all"><Youtube size={20} /></a>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 px-4">Delta Institute © 2026</p>
      </div>
    </aside>
  );
}

function Header({ currentView, setView, lang, setLang, onCartClick, cartCount, likedCount, user, onProductClick, onMenuClick }: any) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    
    const productResults = ALL_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    ).map(p => ({ ...p, type: 'product' }));

    const pageResults = PAGES.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.desc.toLowerCase().includes(query)
    ).map(p => ({ ...p, type: 'page' }));

    return [...pageResults, ...productResults].slice(0, 8);
  }, [searchQuery]);

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[280px] z-50 glass-header">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"
          >
            <Menu size={20} />
          </button>

          <div className="hidden md:block w-48 lg:w-72 relative">
            <div className="flex items-center bg-warm-bg rounded-full px-4 py-2 gap-2 transition-all">
              <Search size={14} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products, pages..." 
                className="bg-transparent outline-none text-xs w-full text-slate-900 placeholder:text-slate-400" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
            </div>

            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setShowSuggestions(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden z-[60]"
                  >
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      {suggestions.map((item: any, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            if (item.type === 'page') {
                              setView(item.view);
                            } else {
                              onProductClick(item);
                              setView("product-detail");
                              window.scrollTo(0, 0);
                            }
                            setSearchQuery("");
                            setShowSuggestions(false);
                          }}
                          className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-none group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-delta-primary/10 group-hover:text-delta-primary transition-all overflow-hidden">
                            {item.type === 'page' ? <LayoutGrid size={18} /> : <img src={item.img} alt="" className="w-full h-full object-cover" />}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-xs font-bold text-slate-900">{item.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{item.type === 'page' ? 'Page' : item.category}</p>
                          </div>
                          <ArrowRight size={14} className="text-slate-300 group-hover:text-delta-primary transition-all" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 cursor-pointer" onClick={() => setView("home")}>
            <div className="w-8 h-8 bg-delta-primary rounded-lg flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/seed/delta-logo-cat/200/200" alt="Delta Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="font-bold text-lg tracking-tighter text-white leading-none">DELTA</span>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-10 font-bold text-sm uppercase tracking-widest text-slate-500 absolute left-1/2 -translate-x-1/2">
          <button onClick={() => setView("home")} className={`${currentView === "home" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : "hover:text-slate-900"} transition-colors`}>Home</button>
          <button onClick={() => setView("shop")} className={`${currentView === "shop" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : "hover:text-slate-900"} transition-colors`}>Shop</button>
          <button onClick={() => setView("blogs")} className={`${currentView === "blogs" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : "hover:text-slate-900"} transition-colors`}>Blogs</button>
          <button onClick={() => setView("courses")} className={`${currentView === "courses" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : "hover:text-slate-900"} transition-colors`}>Courses</button>
          <button onClick={() => setView("services")} className={`${currentView === "services" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : "hover:text-slate-900"} transition-colors`}>Services</button>
          <button onClick={() => setView("contact")} className={`${currentView === "contact" ? "text-slate-900 border-b-2 border-slate-900 pb-1" : "hover:text-slate-900"} transition-colors`}>Contact</button>
        </nav>

        <div className="flex items-center gap-3 md:gap-6 text-slate-400">
          <button 
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"
          >
            <Search size={20} />
          </button>

          <div className="hidden sm:flex items-center gap-3 text-sm font-black text-slate-400 mr-2">
            <button onClick={() => setLang("ENG")} className={`${lang === "ENG" ? "text-slate-900" : "text-slate-400 hover:text-slate-900"} transition-colors`}>ENG</button>
            <span className="text-slate-200">/</span>
            <button onClick={() => setLang("HIN")} className={`${lang === "HIN" ? "text-slate-900 font-hindi" : "text-slate-400 hover:text-slate-900 font-hindi"} transition-colors`}>हिन्दी</button>
          </div>

          <div className="relative cursor-pointer hover:text-slate-900 transition-colors" onClick={() => setView("liked")}>
            <Heart size={20} className={currentView === "liked" ? "text-slate-900" : ""} />
          </div>

          <div className="relative cursor-pointer hover:text-slate-900 transition-colors" onClick={onCartClick}>
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-delta-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
          </div>

          <div className="relative" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer overflow-hidden border border-white hover:border-delta-primary transition-all">
              <Avatar index={user.avatarIndex} size={32} />
            </div>
            
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden z-[60]"
                >
                  <div className="p-4 border-b border-black/5">
                    <p className="text-xs font-black text-slate-900 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <button onClick={() => { setView("dashboard"); setIsProfileOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-delta-primary/10 hover:text-delta-primary transition-all flex items-center gap-2">
                      <Settings size={14} /> Dashboard
                    </button>
                    <button onClick={() => { setView("profile"); setIsProfileOpen(false); }} className="w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-delta-primary/10 hover:text-delta-primary transition-all flex items-center gap-2">
                      <User size={14} /> Edit Profile
                    </button>
                    <div className="my-1 border-t border-black/5" />
                    <button className="w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold text-red-500 hover:bg-red-50 transition-all flex items-center gap-2">
                      <X size={14} /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden px-4 pb-4 overflow-hidden"
          >
            <div className="relative">
              <div className="flex items-center bg-white/10 rounded-full px-4 py-3 gap-2 focus-within:bg-white/20 focus-within:ring-2 focus-within:ring-white/20 transition-all">
                <Search size={16} className="text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search products, pages..." 
                  className="bg-transparent outline-none text-sm w-full text-white placeholder:text-white/40" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  autoFocus
                />
              </div>

              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden z-[60]"
                  >
                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                      {suggestions.map((item: any, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            if (item.type === 'page') {
                              setView(item.view);
                            } else {
                              onProductClick(item);
                              setView("product-detail");
                              window.scrollTo(0, 0);
                            }
                            setSearchQuery("");
                            setShowSuggestions(false);
                            setIsMobileSearchOpen(false);
                          }}
                          className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-none group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-delta-primary/10 group-hover:text-delta-primary transition-all overflow-hidden">
                            {item.type === 'page' ? <LayoutGrid size={18} /> : <img src={item.img} alt="" className="w-full h-full object-cover" />}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-xs font-bold text-slate-900">{item.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{item.type === 'page' ? 'Page' : item.category}</p>
                          </div>
                          <ArrowRight size={14} className="text-slate-300 group-hover:text-delta-primary transition-all" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HomeView({ setView, onAddToCart, likedItems, onToggleLike, isCategoriesOpen, setIsCategoriesOpen, onProductClick }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const services = [
    { icon: <Copy size={24} />, title: "PHOTOCOPY", desc: "B&W and Color duplication", view: "printing" },
    { icon: <Printer size={24} />, title: "PRINTING", desc: "High-speed industrial quality", view: "printing" },
    { icon: <Layers size={24} />, title: "LAMINATION", desc: "Durable protective coating", view: "printing" },
    { icon: <FilePen size={24} />, title: "FORM FILLING", desc: "Assisted government portals", view: "services" },
    { icon: <Monitor size={24} />, title: "COMPUTER SERVICES", desc: "Software & hardware repair", view: "services" },
    { icon: <Pen size={24} />, title: "STATIONERY", desc: "Premium office supplies", view: "shop" },
    { icon: <Gift size={24} />, title: "GIFTS", desc: "Custom corporate branding", view: "shop" }
  ];

  return (
    <>
      <section className="relative px-4 md:px-8 pt-4">
        <button 
          onClick={() => setIsCategoriesOpen(true)}
          tabIndex={0}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 w-14 h-16 bg-white/80 backdrop-blur-md border-r border-y border-white/50 rounded-r-2xl shadow-[10px_0_30px_-10px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center group transition-all duration-300 hover:w-16"
          style={{ opacity: 1, transform: 'none' }}
        >
          <div className="relative">
            <LayoutGrid 
              size={24} 
              className="lucide lucide-layout-grid text-delta-primary group-hover:translate-x-1 transition-transform" 
            />
          </div>
          <span className="text-[8px] font-black uppercase tracking-tighter mt-1 text-slate-400 group-hover:text-delta-primary transition-colors">
            Menu
          </span>
        </button>

        <div className="relative min-h-[70vh] flex items-center px-8 md:px-16 overflow-hidden rounded-[3rem] border border-black/5 shadow-sm">
          <div className="absolute inset-0 z-0" style={{ opacity: 1 }}>
            <img 
              alt="Banner Background" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>
          <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10" style={{ opacity: 1, transform: 'none' }}>
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-bold text-delta-primary tracking-tighter leading-[0.9]">
                  Learning <br />& Store
                </h1>
                <p className="text-lg text-delta-secondary max-w-lg leading-relaxed font-medium">
                  Expert computer services, quality stationery, and professional institute courses all under one roof.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => setView('courses')}
                  className="px-10 py-4 bg-white text-delta-primary border-2 border-delta-primary rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-delta-primary hover:text-white transition-all outline-none"
                >
                  Explore Courses
                </button>
                <button 
                  onClick={() => setView('shop')}
                  className="px-10 py-4 bg-delta-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-delta-primary/90 transition-all shadow-xl shadow-delta-primary/20 outline-none"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-12 overflow-hidden bg-warm-bg">
        <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
          {["PREMIUM STATIONERY", "EXPERT COMPUTER SERVICES", "PROFESSIONAL COURSES", "BULK PRINTING", "GIFT CUSTOMIZATION", "FORM FILLING"].map((text, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-delta-primary" />
              <span className="text-4xl font-black text-delta-primary/10 uppercase tracking-tighter">{text}</span>
            </div>
          ))}
          {["PREMIUM STATIONERY", "EXPERT COMPUTER SERVICES", "PROFESSIONAL COURSES", "BULK PRINTING", "GIFT CUSTOMIZATION", "FORM FILLING"].map((text, idx) => (
            <div key={idx + 10} className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-delta-primary" />
              <span className="text-4xl font-black text-delta-primary/10 uppercase tracking-tighter">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Notice Bar */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto -mt-6 relative z-20">
        <div className="bg-white/80 backdrop-blur-md py-4 px-6 rounded-2xl border border-black/5 shadow-lg flex flex-col sm:flex-row items-center gap-4 mb-12 group">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center text-black flex-shrink-0">
              <Megaphone size={20} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-delta-primary uppercase tracking-widest">Important Notices</span>
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              </div>
              <p className="text-sm font-bold text-slate-900 leading-tight">Live form open till Oct 31st. Visit our service desk for assisted filling.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Services */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tighter uppercase">Core Services</h2>
          <button onClick={() => setView("services")} className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 hover:text-slate-900 transition-colors">
            VIEW ALL <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-hidden relative">
          <motion.div 
            className="flex gap-6 whitespace-nowrap py-4"
            animate={{ 
              x: isHovered ? undefined : [0, -1035] 
            }}
            transition={{ 
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {[...services, ...services].map((item, idx) => (
              <motion.div 
                key={idx} 
                onClick={() => setView(item.view)} 
                whileHover={{ scale: 1.1, zIndex: 20 }}
                className="flex-shrink-0 w-[240px] bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-6 group cursor-pointer hover:shadow-xl transition-all flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-delta-primary group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <div className="space-y-2 whitespace-normal">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">{item.title}</h3>
                  <p className="text-[11px] text-slate-400 font-bold leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-warm-bg to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-warm-bg to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* Top Picks */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tighter uppercase">Top Picks</h2>
          <button onClick={() => setView("shop")} className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 hover:text-slate-900 transition-colors">
            VIEW ALL <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          {[
            { id: 1, name: "Premium Fountain Pen", category: "Pens", brand: "Parker", price: 1299, originalPrice: 2599, discount: "50% off", rating: 4.9, img: "https://picsum.photos/seed/delta-pen-1/400/400", bestseller: true, inStock: true },
            { id: 2, name: "Leather Bound Journal", category: "Notebooks", brand: "Moleskine", price: 850, originalPrice: 1060, discount: "20% off", rating: 4.8, img: "https://picsum.photos/seed/delta-journal-1/400/400", bestseller: true, inStock: true },
            { id: 11, name: "Executive Desk Organizer", category: "Desk Accessories", brand: "Other", price: 1800, originalPrice: 3600, discount: "50% off", rating: 4.9, img: "https://picsum.photos/seed/delta-organizer-1/400/400", bestseller: true, inStock: true },
            { id: 17, name: "Premium Calligraphy Set", category: "Stationery Sets", brand: "Other", price: 3200, originalPrice: 4000, discount: "20% off", rating: 4.9, img: "https://picsum.photos/seed/delta-calli-1/400/400", bestseller: true, inStock: true },
            { id: 5, name: "Mechanical Pencil Set", category: "Pens", brand: "Staedtler", price: 450, originalPrice: 900, discount: "50% off", rating: 5, img: "https://picsum.photos/seed/delta-pencil-1/400/400", bestseller: true, inStock: true },
          ].map((product) => (
            <motion.div layout key={product.id} onClick={() => onProductClick(product)} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-50 mb-4 shadow-sm">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-delta-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">{product.discount}</span>
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                  <button onClick={(e) => { e.stopPropagation(); onToggleLike(product); }} className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl transition-colors ${likedItems.find((w: any) => w.id === product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}>
                    <Heart size={18} fill={likedItems.find((w: any) => w.id === product.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-xl transition-colors"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </div>
              <div className="space-y-2 px-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{product.category}</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-black text-slate-900">{product.rating}</span>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-delta-primary transition-colors line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-slate-900">₹{product.price.toLocaleString()}</span>
                  <span className="text-sm text-slate-400 line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                  className="w-full mt-4 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-delta-primary transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-xl shadow-slate-900/10"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ratings & Video Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Video & Map */}
        <div className="space-y-8">
          <div className="relative group cursor-pointer rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5">
            <div className="aspect-[16/10] bg-slate-200 relative overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                    <Play size={32} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Featured Video</p>
                  <h4 className="text-xl font-bold text-white">Inside Delta Workspace</h4>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest">02:45</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] border border-black/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="aspect-[2/1] bg-slate-100 relative overflow-hidden">
              <img alt="Map" className="w-full h-full object-cover opacity-60 grayscale-[0.5]" referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-500 shadow-xl border-4 border-white/50">
                  <MapPin size={24} fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-3 text-delta-primary">
                <MapPin size={24} className="text-[#2bb6b6]" />
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Find us here</h3>
              </div>
              <p className="text-sm font-medium text-slate-400">123 Station Road, Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>

        {/* Right: Ratings */}
        <div className="space-y-8">
          <div className="bg-white rounded-[3rem] border border-black/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden relative">
            <div className="p-10 space-y-8">
              <div className="flex items-start justify-between">
                <h3 className="text-4xl font-bold text-slate-800 tracking-tight">Ratings</h3>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-1 justify-end">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />)}
                    <span className="text-2xl font-bold text-slate-800 ml-2">4.8</span>
                  </div>
                  <p className="text-sm font-bold text-slate-400">44% Reviews</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-slate-400 text-sm font-medium border-b border-slate-100 pb-6">
                <div className="flex items-center gap-2">
                  <ThumbsUp size={16} className="text-delta-primary" />
                  <span>Good</span>
                </div>
                <div className="w-px h-4 bg-slate-200"></div>
                <span>240 verified</span>
              </div>

              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                {[
                  { name: "Anuj P.", initial: "anuj", text: "Great service and friendly staff!", time: "1 week ago" },
                  { name: "Neha R.", initial: "neha", text: "High-quality products and fast delivery!", time: "3 days ago" },
                  { name: "Vikram S.", initial: "vikram", text: "The stationery collection is top-notch. Highly recommended!", time: "2 weeks ago" },
                  { name: "Priya M.", initial: "priya", text: "Best place for all my office needs. Very reliable.", time: "5 days ago" },
                  { name: "Rahul K.", initial: "rahul", text: "Excellent customer support and genuine products.", time: "1 month ago" }
                ].map((review, idx) => (
                  <div key={idx} className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                          <img className="w-full h-full object-cover" referrerPolicy="no-referrer" src={`https://i.pravatar.cc/150?u=${review.initial}`} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{review.name}</h4>
                          <p className="text-[10px] text-slate-300 font-medium">Verified Customer</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{review.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">"{review.text}"</p>
                  </div>
                ))}
              </div>
              <button className="w-full text-sm font-bold text-slate-400 flex items-center justify-center gap-2 hover:text-delta-primary transition-colors">
                View All <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div 
            onClick={() => setView("coming-soon")} 
            className="bg-black rounded-[2.5rem] p-10 flex items-center gap-8 text-white relative overflow-hidden group cursor-pointer"
          >
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center flex-shrink-0 relative z-10">
              <ShoppingBag size={40} />
            </div>
            <div className="space-y-3 relative z-10">
              <div className="inline-block px-2 py-1 bg-white text-black text-[8px] font-black uppercase tracking-widest rounded">New Drop</div>
              <h3 className="text-3xl font-bold tracking-tighter">COMING SOON</h3>
              <p className="text-xs text-white/50 font-medium leading-relaxed max-w-[280px]">The Delta Limited Edition collection. Exclusive workspace tools designed for peak efficiency.</p>
            </div>
            <ShoppingBag size={180} className="absolute -right-12 -bottom-12 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-8 right-8 text-white/20 group-hover:text-delta-primary transition-colors">
              <ArrowRight size={24} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ShopView({ onAddToCart, likedItems, onToggleLike, onProductClick }: any) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedPromotions, setSelectedPromotions] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>(["In Stock"]);
  const [priceRange, setPriceRange] = useState(5000);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Default Sorting");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const categories = ["Pens", "Notebooks", "Art Supplies", "Planners", "Desk Accessories", "Stationery Sets"];
  const brands = ["Parker", "Moleskine", "Faber-Castell", "Staedtler", "Pilot", "Uni-ball", "Camlin", "Classmate"];
  const promotions = ["New Arrivals", "Best Sellers", "On Sale"];

  const products = [
    { id: 1, name: "Premium Fountain Pen", category: "Pens", brand: "Parker", price: 1299, originalPrice: 2599, discount: "50% off", rating: 4.9, img: "https://picsum.photos/seed/delta-pen-1/400/400", bestseller: true, inStock: true },
    { id: 2, name: "Leather Bound Journal", category: "Notebooks", brand: "Moleskine", price: 850, originalPrice: 1060, discount: "20% off", rating: 4.8, img: "https://picsum.photos/seed/delta-journal-1/400/400", bestseller: true, inStock: true },
    { id: 3, name: "Artist Sketch Set", category: "Art Supplies", brand: "Faber-Castell", price: 2100, originalPrice: 3000, discount: "30% off", rating: 5, img: "https://picsum.photos/seed/delta-art-1/400/400", bestseller: false, inStock: true },
    { id: 4, name: "Ergonomic Desk Lamp", category: "Desk Accessories", brand: "Other", price: 3499, originalPrice: 3880, discount: "10% off", rating: 5, img: "https://picsum.photos/seed/delta-lamp-1/400/400", bestseller: false, inStock: true },
    { id: 5, name: "Mechanical Pencil Set", category: "Pens", brand: "Staedtler", price: 450, originalPrice: 900, discount: "50% off", rating: 5, img: "https://picsum.photos/seed/delta-pencil-1/400/400", bestseller: true, inStock: true },
    { id: 6, name: "Hardcover Planner", category: "Planners", brand: "Classmate", price: 1100, originalPrice: 2200, discount: "50% off", rating: 5, img: "https://picsum.photos/seed/delta-planner-1/400/400", bestseller: true, inStock: true },
    { id: 7, name: "Gel Pen Multi-Color Pack", category: "Pens", brand: "Pilot", price: 750, originalPrice: 1500, discount: "50% off", rating: 4.8, img: "https://picsum.photos/seed/delta-gelpen-1/400/400", bestseller: false, inStock: true },
    { id: 8, name: "Watercolor Paint Set", category: "Art Supplies", brand: "Camlin", price: 1200, originalPrice: 2400, discount: "50% off", rating: 4.9, img: "https://picsum.photos/seed/delta-watercolor-1/400/400", bestseller: false, inStock: true },
    { id: 9, name: "Spiral Bound Notebook", category: "Notebooks", brand: "Classmate", price: 150, originalPrice: 300, discount: "50% off", rating: 5, img: "https://picsum.photos/seed/delta-notebook-1/400/400", bestseller: true, inStock: true },
    { id: 10, name: "Professional Drawing Pencils", category: "Art Supplies", brand: "Staedtler", price: 950, originalPrice: 1900, discount: "50% off", rating: 4.8, img: "https://picsum.photos/seed/delta-drawing-1/400/400", bestseller: false, inStock: true },
    { id: 11, name: "Executive Desk Organizer", category: "Desk Accessories", brand: "Other", price: 1800, originalPrice: 3600, discount: "50% off", rating: 4.9, img: "https://picsum.photos/seed/delta-organizer-1/400/400", bestseller: true, inStock: true },
    { id: 12, name: "Calligraphy Ink Set", category: "Art Supplies", brand: "Other", price: 650, originalPrice: 1300, discount: "50% off", rating: 4.8, img: "https://picsum.photos/seed/delta-ink-1/400/400", bestseller: false, inStock: true },
    { id: 13, name: "Premium Acrylic Paints", category: "Art Supplies", brand: "Other", price: 1500, originalPrice: 2000, discount: "25% off", rating: 4.7, img: "https://picsum.photos/seed/delta-art-2/400/400", bestseller: false, inStock: true },
    { id: 14, name: "Dotted Grid Journal", category: "Notebooks", brand: "Other", price: 950, originalPrice: 1200, discount: "20% off", rating: 4.9, img: "https://picsum.photos/seed/delta-journal-2/400/400", bestseller: false, inStock: true },
    { id: 15, name: "Technical Drawing Pens", category: "Pens", brand: "Other", price: 800, originalPrice: 1000, discount: "20% off", rating: 4.8, img: "https://picsum.photos/seed/delta-pen-2/400/400", bestseller: false, inStock: true },
    { id: 16, name: "Luxury Wax Seal Kit", category: "Stationery Sets", brand: "Other", price: 2499, originalPrice: 4999, discount: "50% off", rating: 5, img: "https://picsum.photos/seed/delta-wax-1/400/400", bestseller: true, inStock: true },
    { id: 17, name: "Premium Calligraphy Set", category: "Stationery Sets", brand: "Other", price: 3200, originalPrice: 4000, discount: "20% off", rating: 4.9, img: "https://picsum.photos/seed/delta-calli-1/400/400", bestseller: true, inStock: true },
    { id: 18, name: "Leather Pencil Case", category: "Desk Accessories", brand: "Other", price: 1200, originalPrice: 1500, discount: "20% off", rating: 4.8, img: "https://picsum.photos/seed/delta-case-1/400/400", bestseller: false, inStock: true },
    { id: 19, name: "A5 Dot Grid Journal", category: "Notebooks", brand: "Other", price: 899, originalPrice: 1199, discount: "25% off", rating: 4.9, img: "https://picsum.photos/seed/delta-journal-3/400/400", bestseller: false, inStock: true },
    { id: 20, name: "Dual Tip Brush Pens", category: "Art Supplies", brand: "Other", price: 1800, originalPrice: 2400, discount: "25% off", rating: 4.7, img: "https://picsum.photos/seed/delta-brush-1/400/400", bestseller: true, inStock: true }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const catMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(p.rating));
      const priceMatch = p.price <= priceRange;
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const availMatch = availability.length === 0 || (availability.includes("In Stock") && p.inStock) || (availability.includes("Out of Stock") && !p.inStock);
      return catMatch && brandMatch && priceMatch && searchMatch && ratingMatch && availMatch;
    }).sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Top Rated") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategories, selectedBrands, selectedRatings, priceRange, searchQuery, sortBy, availability]);

  const itemsPerPage = 16;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleFilter = (list: any[], setList: any, item: any) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
    setCurrentPage(1);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      <section className="bg-slate-900 py-16 px-4 md:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-900 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold font-serif italic tracking-tighter">Stationery Shop</h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">Premium tools for your creative and academic journey.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <div className="lg:hidden mb-8">
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full py-4 bg-white border border-black/5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-sm"
          >
            <Filter size={14} /> {isFiltersOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          {/* Filters Sidebar */}
          <aside className={`${isFiltersOpen ? "block" : "hidden"} lg:block w-full lg:w-72 space-y-8`}>
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-10 min-w-[288px]">
              <h2 className="text-xl font-bold border-b border-black/5 pb-4 text-slate-900">Filter Options</h2>
              
              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Search Products</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search stationery..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-delta-primary/20 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">By Categories</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                        className="w-4 h-4 rounded border-slate-300 text-delta-primary focus:ring-delta-primary" 
                      />
                      <span className="text-sm text-slate-600 group-hover:text-delta-primary transition-colors font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">By Brands</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                        className="w-4 h-4 rounded border-slate-300 text-delta-primary focus:ring-delta-primary" 
                      />
                      <span className="text-sm text-slate-600 group-hover:text-delta-primary transition-colors font-medium">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Price Range</h3>
                <div className="space-y-4">
                  <div className="text-sm font-bold text-slate-700">₹0 - ₹{priceRange}</div>
                  <input 
                    type="range" 
                    min="0" max="5000" step="100" 
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-delta-primary" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Customer Review</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(star => (
                    <label key={star} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedRatings.includes(star)}
                        onChange={() => toggleFilter(selectedRatings, setSelectedRatings, star)}
                        className="w-4 h-4 rounded border-slate-300 text-delta-primary focus:ring-delta-primary" 
                      />
                      <div className="flex items-center gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            fill={i < star ? "currentColor" : "none"} 
                            className={i < star ? "" : "text-slate-200"} 
                            strokeWidth={i < star ? 0 : 2}
                          />
                        ))}
                        <span className="text-xs text-slate-400 ml-1 font-bold">{star} Star</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Promotions</h3>
                <div className="space-y-2">
                  {promotions.map(promo => (
                    <label key={promo} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedPromotions.includes(promo)}
                        onChange={() => toggleFilter(selectedPromotions, setSelectedPromotions, promo)}
                        className="w-4 h-4 rounded border-slate-300 text-delta-primary focus:ring-delta-primary" 
                      />
                      <span className="text-sm text-slate-600 group-hover:text-delta-primary transition-colors font-medium">{promo}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Availability</h3>
                <div className="space-y-2">
                  {["In Stock", "Out of Stocks"].map(status => (
                    <label key={status} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={availability.includes(status)}
                        onChange={() => toggleFilter(availability, setAvailability, status)}
                        className="w-4 h-4 rounded border-slate-300 text-delta-primary focus:ring-delta-primary" 
                      />
                      <span className="text-sm text-slate-600 group-hover:text-delta-primary transition-colors font-medium">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
                Showing 1-{Math.min(currentProducts.length, itemsPerPage)} of {filteredProducts.length} results
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none text-delta-primary cursor-pointer"
                >
                  <option>Default Sorting</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-slate-400 mr-2">Active Filter</span>
              {selectedCategories.map(cat => (
                <button key={cat} onClick={() => toggleFilter(selectedCategories, setSelectedCategories, cat)} className="px-3 py-1 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-600 rounded-full hover:bg-delta-primary hover:text-white transition-all flex items-center gap-2">
                  {cat} <X size={10} />
                </button>
              ))}
              {selectedBrands.map(brand => (
                <button key={brand} onClick={() => toggleFilter(selectedBrands, setSelectedBrands, brand)} className="px-3 py-1 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-600 rounded-full hover:bg-delta-primary hover:text-white transition-all flex items-center gap-2">
                  {brand} <X size={10} />
                </button>
              ))}
              {selectedRatings.map(star => (
                <button key={star} onClick={() => toggleFilter(selectedRatings, setSelectedRatings, star)} className="px-3 py-1 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-600 rounded-full hover:bg-delta-primary hover:text-white transition-all flex items-center gap-2">
                  {star} Stars <X size={10} />
                </button>
              ))}
              {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedRatings.length > 0) && (
                <button 
                  onClick={() => { setSelectedCategories([]); setSelectedBrands([]); setSelectedRatings([]); }}
                  className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {currentProducts.length > 0 ? (
              <div className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                  {currentProducts.map(product => (
                    <motion.div layout key={product.id} onClick={() => onProductClick(product)} className="group cursor-pointer">
                      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-50 mb-4 shadow-sm">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-delta-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">{product.discount}</span>
                        </div>
                        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                          <button onClick={(e) => { e.stopPropagation(); onToggleLike(product); }} className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl transition-colors ${likedItems.find((w: any) => w.id === product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}>
                            <Heart size={18} fill={likedItems.find((w: any) => w.id === product.id) ? 'currentColor' : 'none'} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-xl transition-colors"
                          >
                            <Search size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2 px-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{product.category}</span>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star size={12} fill="currentColor" />
                            <span className="text-xs font-black text-slate-900">{product.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-900 group-hover:text-delta-primary transition-colors line-clamp-1">{product.name}</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-black text-slate-900">₹{product.price.toLocaleString()}</span>
                          <span className="text-sm text-slate-400 line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                          className="w-full mt-4 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-delta-primary transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-xl shadow-slate-900/10"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-3 pt-12">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-delta-primary hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-delta-primary text-white shadow-lg shadow-delta-primary/20' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-delta-primary hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <Search size={32} className="text-slate-200" />
                </div>
                <h3 className="font-bold text-slate-900">No products found</h3>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tighter">New Arrivals</h2>
            <div className="h-1 w-12 bg-delta-primary rounded-full" />
          </div>
          <button className="text-[10px] font-black text-delta-primary uppercase tracking-[0.2em] hover:underline">Explore All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-10">
          {products.slice(15, 20).map(product => (
            <motion.div layout key={product.id} className="group">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#f3f4f6] mb-4 shadow-sm">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">New</span>
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                  <button onClick={() => onToggleLike(product)} className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl transition-colors ${likedItems.find((w: any) => w.id === product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}>
                    <Heart size={18} fill={likedItems.find((w: any) => w.id === product.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-delta-primary shadow-xl transition-colors">
                    <Search size={18} />
                  </button>
                </div>
              </div>
              <div className="space-y-2 px-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{product.category}</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-black text-slate-900">{product.rating}</span>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-delta-primary transition-colors line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-delta-primary">₹{product.price.toLocaleString()}</span>
                  <span className="text-sm text-slate-400 line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full mt-4 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-delta-primary transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-xl shadow-slate-900/10"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bulk Orders Banner */}
      <section className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <div className="bg-delta-secondary rounded-[3rem] p-12 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Bulk Stationery Orders?</h2>
            <p className="text-white/80 text-lg">Special pricing for schools, offices, and large organizations. Get customized kits and wholesale rates.</p>
          </div>
          <button className="relative z-10 px-12 py-5 bg-delta-primary text-white font-black rounded-full hover:bg-delta-primary/90 transition-all uppercase tracking-widest text-xs shadow-2xl">
            Request Wholesale Quote
          </button>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-t border-slate-100 py-12 px-4 md:px-8 bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Package size={32} />, title: "Free Shipping", desc: "Free shipping for order above ₹500" },
            { icon: <CreditCard size={32} />, title: "Flexible Payment", desc: "Multiple secure payment options" },
            { icon: <MessageCircle size={32} />, title: "24x7 Support", desc: "We support online all days" }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                <div className="text-delta-primary">{feature.icon}</div>
              </div>
              <div>
                <h4 className="font-bold text-lg">{feature.title}</h4>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CoursesView() {
  const categories = [
    { name: "Software & Design", icon: <PenTool size={18} /> },
    { name: "Accounting", icon: <Calculator size={18} /> },
    { name: "Programming", icon: <Cpu size={18} /> },
    { name: "Basics & Advance", icon: <Monitor size={18} /> },
    { name: "Certifications", icon: <Award size={18} /> }
  ];

  const courses = [
    { title: "Photoshop", category: "Software & Design", price: "₹2,500", duration: "2 Months", icon: <PenTool />, desc: "Master digital imaging and photo editing." },
    { title: "CorelDRAW", category: "Software & Design", price: "₹2,500", duration: "2 Months", icon: <Layout />, desc: "Vector graphics design for professional layouts." },
    { title: "Tally & Accounting", category: "Accounting", price: "₹4,500", duration: "3 Months", icon: <Calculator />, desc: "Fundamental accounting principles with Tally Prime." },
    { title: "Tally Advance", category: "Accounting", price: "₹3,500", duration: "2 Months", icon: <BookOpen />, desc: "Expert level accounting and GST management." },
    { id: "c-lang", title: "C Language", category: "Programming", price: "₹3,000", duration: "3 Months", icon: <Cpu />, desc: "Learn the foundation of modern programming." },
    { title: "C++", category: "Programming", price: "₹3,500", duration: "3 Months", icon: <Cpu />, desc: "Master object-oriented programming." },
    { title: "Computer Basics", category: "Basics & Advance", price: "₹2,500", duration: "3 Months", icon: <Monitor />, desc: "MS Office basics and fundamental computer skills." },
    { title: "MS Excel Advance", category: "Basics & Advance", price: "₹2,000", duration: "1 Month", icon: <TableProperties />, desc: "Advanced formulas, pivot tables, and automation." },
    { title: "DCA", category: "Certifications", price: "₹6,500", duration: "6 Months", icon: <Award />, desc: "Diploma in Computer Application." },
    { title: "PGDCA", category: "Certifications", price: "₹12,000", duration: "1 Year", icon: <Award />, desc: "Post Graduate Diploma in Computer Application." }
  ];

  const testimonials = [
    { name: "Rahul S.", text: "The Tally Advance course helped me land my first accounting job!", rating: 5 },
    { name: "Priya V.", text: "Excellent teaching style for C++. Even complex topics were made easy.", rating: 5 },
    { name: "Amit K.", text: "Computer basics course was very helpful for my office work.", rating: 4 }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Redesigned Banner - Based on Reference */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <div className="relative bg-gradient-to-br from-indigo-600 to-blue-500 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-10 py-10 md:py-12 gap-10">
            {/* Left Content */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                  Welcome to <br className="hidden md:block" />
                  <span className="text-blue-100">Delta Academy</span>
                </h1>
                <p className="text-indigo-100 text-sm md:text-base font-medium max-w-md">
                  You are viewing 10+ professional certification courses. Start your learning journey today!
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <button className="px-8 py-3 bg-white text-indigo-600 font-black rounded-xl hover:bg-indigo-50 transition-all uppercase tracking-widest text-[10px] shadow-xl">
                  Explore Courses
                </button>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-slate-100 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-indigo-500 flex items-center justify-center text-[8px] font-bold text-white uppercase">
                    +2k
                  </div>
                </div>
              </div>
            </div>

            {/* Right Illustration Placeholder */}
            <div className="hidden md:flex flex-1 justify-end relative">
              <div className="relative w-64 h-64 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                <div className="absolute inset-0 animate-spin-slow opacity-20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full" />
                </div>
                <GraduationCap size={120} className="text-white relative z-20 drop-shadow-2xl" />
                {/* Floating tags to mimic candidates in reference */}
                <div className="absolute -top-4 -left-4 bg-white p-3 rounded-2xl shadow-xl border border-black/5 rotate-[-6deg] animate-bounce">
                  <Cpu size={24} className="text-indigo-600" />
                </div>
                <div className="absolute -bottom-4 right-0 bg-white p-3 rounded-2xl shadow-xl border border-black/5 rotate-[6deg] scale-110">
                  <PenTool size={24} className="text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Stats Grid (No Headline) */}
      <section className="max-w-7xl mx-auto pt-12 px-4 md:px-8 text-center space-y-16">
        {/* Highlight Grid - Integrated Design */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm flex flex-col justify-center gap-6 text-left">
            <div className="text-center space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Batch Timings</p>
              <div className="h-px w-8 bg-delta-primary mx-auto" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-black">
                <span className="text-slate-400 uppercase tracking-widest">Morning (B1)</span>
                <span className="text-slate-900">11 AM — 02 PM</span>
              </div>
              <div className="h-px bg-black/[0.03]" />
              <div className="flex justify-between items-center text-xs font-black">
                <span className="text-slate-400 uppercase tracking-widest">Evening (B2)</span>
                <span className="text-slate-900">04 PM — 07 PM</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-center items-center space-y-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-delta-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest relative z-10">Total Students</p>
            <p className="text-6xl font-black relative z-10">2,500+</p>
            <p className="text-[10px] font-black text-delta-primary uppercase tracking-widest relative z-10">Alumni Network</p>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm flex flex-col justify-center items-center space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Placement Success</p>
            <p className="text-6xl font-black text-slate-900">98%</p>
            <p className="text-[10px] font-black text-green-500 uppercase tracking-widest font-mono">Verified Records</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-24 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="flex-1 space-y-24">
            {categories.map((category, catIdx) => (
              <div key={catIdx} className="space-y-12">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm border border-black/5">
                    {category.icon}
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 tracking-tight uppercase">{category.name}</h2>
                  <div className="h-px flex-1 bg-black/[0.05]" />
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  {courses
                    .filter(c => c.category === category.name)
                    .map((s, i) => (
                      <motion.div 
                        key={s.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm group hover:shadow-2xl hover:shadow-black/5 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-6 text-left">
                          <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-delta-primary group-hover:text-white transition-all duration-500">
                              {React.cloneElement(s.icon as React.ReactElement, { size: 28 })}
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Fee</p>
                              <p className="text-2xl font-black text-slate-900">{s.price}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-slate-900 leading-tight">{s.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">{s.desc}</p>
                          </div>
                          <div className="flex items-center gap-4 py-3 px-4 bg-slate-50 rounded-2xl border border-black/5">
                            <Calendar size={16} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-600">Duration: {s.duration}</span>
                          </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-black/5 space-y-4">
                          <button className="w-full flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-delta-primary transition-colors">
                            <FileText size={16} /> VIEW COURSE STRUCTURE
                          </button>
                          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-delta-primary transition-all shadow-lg shadow-slate-900/10">
                            Enroll Now
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-12 text-left">
            <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm space-y-8 sticky top-32">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                </div>
                <h4 className="text-xl font-bold text-slate-900">What Students Say</h4>
              </div>
              <div className="space-y-8">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="space-y-3 relative">
                    <p className="text-sm text-slate-500 italic leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">— {t.name}</span>
                      <div className="flex gap-0.5 text-yellow-400 scale-75 origin-right">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                      </div>
                    </div>
                    {idx !== testimonials.length - 1 && <div className="h-px bg-black/[0.03] mt-8" />}
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <button className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                  Join The Community
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Career Guide Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
        <div className="bg-delta-primary rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-left">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter uppercase leading-tight">Not Sure Where to Start?</h2>
              <p className="text-white/80 text-sm max-w-md">Our career counselors help you choose the right path based on your interests.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex w-20 h-20 bg-white/10 backdrop-blur rounded-2xl items-center justify-center border border-white/20 rotate-6 group-hover:rotate-0 transition-transform duration-500">
                <GraduationCap size={40} className="text-white" />
              </div>
              <button className="px-8 py-4 bg-white text-delta-primary font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] shadow-2xl whitespace-nowrap">
                Get Free Counseling
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicesView({ setView }: { setView: (v: string) => void }) {
  const services = [
    { title: "Bulk Printing & Photocopy", desc: "High-speed laser printing and high-quality color photocopying for all your academic and business needs.", icon: <Printer /> },
    { title: "Tech Support & Repair", desc: "Expert computer repair, software installation, and hardware upgrades by certified technicians.", icon: <Settings /> },
    { title: "Gift Customization", desc: "Personalized gifts, mug printing, and custom stationery for special occasions and corporate branding.", icon: <Gift /> }
  ];

  const coreServices = [
    { icon: <Copy size={24} />, title: "PHOTOCOPY", desc: "B&W and Color duplication", view: "printing" },
    { icon: <Printer size={24} />, title: "PRINTING", desc: "High-speed industrial quality", view: "printing" },
    { icon: <FilePen size={24} />, title: "FORM FILLING", desc: "Assisted government portals", view: "services" },
    { icon: <Monitor size={24} />, title: "COMPUTER SERVICES", desc: "Software & hardware repair", view: "services" },
    { icon: <Pen size={24} />, title: "STATIONERY", desc: "Premium office supplies", view: "shop" },
    { icon: <Gift size={24} />, title: "GIFTS", desc: "Custom corporate branding", view: "shop" }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* New Hero Banner Style */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <div className="relative bg-[#2D2B4A] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-900/20">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-10 py-10 md:py-12 gap-10">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">Learning is Fun!</h1>
                <p className="text-white/70 text-sm md:text-base font-medium max-w-md leading-relaxed">
                  Learn fun anywhere and anytime without any time limit just through the application.
                </p>
              </div>
              <button className="px-8 py-3 bg-white text-[#2D2B4A] font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 shadow-xl">
                Get Started
              </button>
            </div>

            <div className="flex-1 relative flex justify-center items-center md:justify-end min-h-[250px] md:min-h-0">
            {/* Illustration Mockup with Icons */}
            <div className="relative">
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 flex items-center justify-center"
              >
                <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-full border border-white/20 p-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                  <User size={140} className="text-white/90 drop-shadow-2xl" />
                </div>
              </motion.div>
              
              {/* Floating Icons */}
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0], y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#2D2B4A] shadow-2xl rotate-12"
              >
                <BookOpen size={28} />
              </motion.div>
              <motion.div 
                animate={{ rotate: [0, -10, 10, 0], y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute bottom-4 -left-8 w-20 h-20 bg-indigo-400 rounded-3xl flex items-center justify-center text-white shadow-2xl -rotate-12"
              >
                <Sparkles size={32} />
              </motion.div>
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 -right-12 w-12 h-12 bg-delta-primary rounded-full flex items-center justify-center text-white shadow-xl"
              >
                <Plus size={20} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>

      <section className="max-w-7xl mx-auto py-24 px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {coreServices.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setView(item.view)} 
              className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-6 group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-delta-primary/10 group-hover:text-delta-primary transition-all">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">{item.title}</h3>
                <p className="text-[11px] text-slate-400 font-bold leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-black/[0.03]" />

      <section className="max-w-7xl mx-auto py-24 px-4 md:px-8 space-y-32">
        {services.map((s, i) => (
          <div key={i} className={`flex flex-col md:flex-row items-center gap-16 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
            <div className="flex-1 space-y-8">
              <div className="w-16 h-16 bg-slate-50 text-slate-900 border border-black/5 rounded-2xl flex items-center justify-center shadow-sm">
                {React.cloneElement(s.icon as React.ReactElement, { size: 32 })}
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-slate-900 tracking-tighter uppercase leading-none">{s.title}</h2>
                <p className="text-slate-500 text-xl leading-relaxed font-medium">{s.desc}</p>
              </div>
              <button className="px-10 py-5 bg-slate-900 text-white font-black rounded-full hover:bg-delta-primary transition-all uppercase tracking-widest text-[11px] shadow-lg shadow-slate-900/20">
                Inquire Now
              </button>
            </div>
            <div className="flex-1 w-full aspect-square md:aspect-video bg-white rounded-[3rem] overflow-hidden border border-black/5 flex items-center justify-center group relative shadow-2xl shadow-black/5">
              <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Package size={80} className="text-slate-100 relative z-10 group-hover:scale-110 group-hover:text-delta-primary/20 transition-all duration-700" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function ContactView() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const faqs = [
    { q: "What are your working hours?", a: "We are open from 9:00 AM to 10:00 PM, seven days a week." },
    { q: "Where is Delta Institute located?", a: "Shop no.9 Vikas Nagar Kusmunda, Korba, CG" },
    { q: "Do you offer computer repair services?", a: "Yes, we offer comprehensive computer repair, hardware upgrades, and software troubleshooting." },
    { q: "Can I order stationery in bulk?", a: "Absolutely! We specialize in bulk orders for offices and schools. Contact us for special pricing." },
    { q: "Do you provide online courses?", a: "We currently focus on in-person professional training at our institute to ensure hands-on learning." }
  ];

  return (
    <main className="pt-16">
      <div className="min-h-screen bg-slate-50 pb-24">
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover opacity-20 grayscale" 
              referrerPolicy="no-referrer" 
              src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2070&auto=format&fit=crop" 
              alt="Contact Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/50 to-slate-50"></div>
          </div>
          <div className="relative z-10 text-center space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-slate-900 tracking-tighter uppercase">Get In Touch</h1>
            <p className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs">We're here to help you grow</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-20">
          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Visit Us</h3>
              <p className="text-lg font-bold text-slate-900 leading-tight mb-1">Shop no.9 Vikas Nagar Kusmunda, Korba, CG</p>
              <p className="text-xs font-bold text-slate-400">Delta Institute</p>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Working Hours</h3>
              <p className="text-lg font-bold text-slate-900 leading-tight mb-1">9:00 AM - 10:00 PM</p>
              <p className="text-xs font-bold text-slate-400">Open All Week</p>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email & Phone</h3>
              <p className="text-lg font-bold text-slate-900 leading-tight mb-1">contact@deltainstitute.com</p>
              <p className="text-xs font-bold text-slate-400 mb-4">support@deltainstitute.com</p>
              <div className="pt-4 border-t border-black/5">
                <p className="text-sm font-bold text-slate-900">+91 98765 43210</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Direct Support Line</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-black/5 shadow-sm space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-slate-900 tracking-tighter uppercase">Send a Message</h2>
                <p className="text-slate-500 font-medium">Have a question or need a quote? Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Name</label>
                    <input required className="w-full px-8 py-5 bg-slate-50 rounded-3xl border border-transparent focus:border-slate-900 focus:bg-white outline-none transition-all text-sm font-bold" placeholder="Your Name" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email</label>
                    <input required className="w-full px-8 py-5 bg-slate-50 rounded-3xl border border-transparent focus:border-slate-900 focus:bg-white outline-none transition-all text-sm font-bold" placeholder="your@email.com" type="email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Subject</label>
                  <input required className="w-full px-8 py-5 bg-slate-50 rounded-3xl border border-transparent focus:border-slate-900 focus:bg-white outline-none transition-all text-sm font-bold" placeholder="How can we help?" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Message</label>
                  <textarea required rows={5} className="w-full px-8 py-5 bg-slate-50 rounded-3xl border border-transparent focus:border-slate-900 focus:bg-white outline-none transition-all text-sm font-bold resize-none" placeholder="Your message here..."></textarea>
                </div>
                <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Send Message</button>
              </form>
              <div className="pt-12 border-t border-black/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Follow Our Socials</span>
                <div className="flex items-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900/10 hover:text-slate-900 transition-all"><Instagram size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900/10 hover:text-slate-900 transition-all"><Facebook size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900/10 hover:text-slate-900 transition-all"><Twitter size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900/10 hover:text-slate-900 transition-all"><Youtube size={18} /></a>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="bg-white p-4 rounded-[3rem] border border-black/5 shadow-sm overflow-hidden h-[400px] relative group">
                <iframe 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=82.6800%2C22.3000%2C82.7200%2C22.3400&layer=mapnik&marker=22.3200%2C82.7000" 
                  className="w-full h-full rounded-[2.5rem] border-none grayscale-[0.5] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700" 
                  title="Delta Institute Location"
                ></iframe>
                <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Delta Institute</h4>
                      <p className="text-[10px] font-bold text-slate-400">Vikas Nagar, Kusmunda, Korba</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-black/5 shadow-sm space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-slate-900 tracking-tighter uppercase">Common Questions</h2>
                  <p className="text-slate-500 font-medium">Quick answers to frequently asked questions about our services and store.</p>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-black/5 last:border-none pb-4">
                      <button 
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between py-4 text-left group"
                      >
                        <span className={`text-sm font-black uppercase tracking-widest transition-colors ${activeFaq === idx ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-900'}`}>
                          {faq.q}
                        </span>
                        <ChevronDown 
                          size={18} 
                          className={`transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-slate-900' : 'text-slate-200'}`} 
                        />
                      </button>
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: "auto", opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }} 
                            className="overflow-hidden"
                          >
                            <p className="text-sm font-bold text-slate-500 leading-relaxed pb-4">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PrintingView() {
  const printingServices = [
    { title: "Paper Printing (A4/A3)", price: "From ₹2", desc: "High-quality laser printing on A4 and A3 paper. Available in both Black & White and vibrant Color options.", icon: <FileText />, color: "bg-blue-50 text-blue-600" },
    { title: "Photocopy Service", price: "₹1 per page", desc: "Fast and clear photocopying for documents, study materials, and books. Bulk discounts available.", icon: <Copy />, color: "bg-indigo-50 text-indigo-600" },
    { title: "Photograph Printing", price: "From ₹10", desc: "Professional photo printing on high-gloss paper. Available in passport size, 4x6, 5x7, and custom sizes.", icon: <ImageIcon />, color: "bg-rose-50 text-rose-600" },
    { title: "Lamination Service", price: "From ₹15", desc: "Protect your important documents, certificates, and photos with our high-quality thermal lamination.", icon: <Shield />, color: "bg-emerald-50 text-emerald-600" },
    { title: "Aadhaar Card Print", price: "₹50", desc: "High-quality PVC Aadhaar card printing. Durable, waterproof, and fits perfectly in your wallet.", icon: <CreditCard />, color: "bg-amber-50 text-amber-600" },
    { title: "PAN Card Print", price: "₹50", desc: "Get your PAN card printed on high-grade PVC material with clear details and long-lasting finish.", icon: <CreditCard />, color: "bg-orange-50 text-orange-600" },
    { title: "Gift Card Printing", price: "From ₹30", desc: "Customized gift cards for birthdays, anniversaries, or corporate gifting. High-quality finish.", icon: <Gift />, color: "bg-pink-50 text-pink-600" },
    { title: "Voter ID & Other Cards", price: "₹50", desc: "PVC printing for Voter IDs, Health Cards, and any other government or private identification cards.", icon: <CreditCard />, color: "bg-slate-50 text-slate-600" }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-900 py-20 px-4 md:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold font-serif italic tracking-tighter">Printing Solutions</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">From everyday document printing to specialized PVC card services, we provide professional quality with quick turnaround.</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto py-24 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {printingServices.map((i, c) => (
            <motion.div 
              key={c}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: c * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className={`w-14 h-14 ${i.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  {React.cloneElement(i.icon as React.ReactElement, { size: 28 })}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{i.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{i.desc}</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-center">
                <span className="text-lg font-black text-slate-900">{i.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TechView({ onAddToCart, likedItems, onToggleLike, onProductClick }: any) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const categories = [
    { name: "All", icon: <ShoppingBag size={14} /> },
    { name: "Keyboards", icon: <Keyboard size={14} /> },
    { name: "Headphones", icon: <Headphones size={14} /> },
    { name: "Earphones", icon: <Headphones size={14} /> },
    { name: "Ear buds", icon: <Headphones size={14} /> },
    { name: "Wired earphones", icon: <Smartphone size={14} /> },
    { name: "Mouse", icon: <Mouse size={14} /> },
    { name: "Mouse pad", icon: <Square size={14} /> }
  ];

  const brands = ["All", "Logitech", "Razer", "Corsair", "Sony", "Bose", "Apple", "Samsung", "JBL", "Boat", "Zebronics", "Sennheiser", "SteelSeries"];

  const techProducts = [
    { id: 101, name: "Logitech MX Master 3S", category: "Mouse", brand: "Logitech", price: 9999, rating: 5, img: "https://picsum.photos/seed/tech-1/400/400" },
    { id: 102, name: "Razer BlackWidow V4 Pro", category: "Keyboards", brand: "Razer", price: 15999, rating: 5, img: "https://picsum.photos/seed/tech-2/400/400" },
    { id: 103, name: "Sony WH-1000XM5", category: "Headphones", brand: "Sony", price: 29999, rating: 5, img: "https://picsum.photos/seed/tech-3/400/400" },
    { id: 104, name: "Apple AirPods Pro (2nd Gen)", category: "Ear buds", brand: "Apple", price: 24900, rating: 5, img: "https://picsum.photos/seed/tech-4/400/400" },
    { id: 105, name: "Bose QuietComfort Earbuds II", category: "Ear buds", brand: "Bose", price: 25900, rating: 5, img: "https://picsum.photos/seed/tech-5/400/400" },
    { id: 106, name: "Sennheiser IE 200", category: "Wired earphones", brand: "Sennheiser", price: 14999, rating: 5, img: "https://picsum.photos/seed/tech-6/400/400" },
    { id: 107, name: "SteelSeries QcK Heavy", category: "Mouse pad", brand: "SteelSeries", price: 1999, rating: 5, img: "https://picsum.photos/seed/tech-7/400/400" },
    { id: 108, name: "JBL Tune 760NC", category: "Headphones", brand: "JBL", price: 5999, rating: 5, img: "https://picsum.photos/seed/tech-8/400/400" },
    { id: 109, name: "Boat Rockerz 450", category: "Headphones", brand: "Boat", price: 1499, rating: 5, img: "https://picsum.photos/seed/tech-9/400/400" },
    { id: 110, name: "Zebronics Zeb-Transformer", category: "Keyboards", brand: "Zebronics", price: 1299, rating: 5, img: "https://picsum.photos/seed/tech-10/400/400" },
    { id: 111, name: "Logitech G Pro X Superlight", category: "Mouse", brand: "Logitech", price: 12999, rating: 5, img: "https://picsum.photos/seed/tech-11/400/400" },
    { id: 112, name: "Razer DeathAdder V3 Pro", category: "Mouse", brand: "Razer", price: 13999, rating: 5, img: "https://picsum.photos/seed/tech-12/400/400" },
    { id: 113, name: "Corsair K70 RGB TKL", category: "Keyboards", brand: "Corsair", price: 11999, rating: 5, img: "https://picsum.photos/seed/tech-13/400/400" },
    { id: 114, name: "Samsung Galaxy Buds2 Pro", category: "Ear buds", brand: "Samsung", price: 17999, rating: 5, img: "https://picsum.photos/seed/tech-14/400/400" },
    { id: 115, name: "Boat Bassheads 225", category: "Wired earphones", brand: "Boat", price: 599, rating: 5, img: "https://picsum.photos/seed/tech-15/400/400" },
    { id: 116, name: "Razer Gigantus V2", category: "Mouse pad", brand: "Razer", price: 1499, rating: 5, img: "https://picsum.photos/seed/tech-16/400/400" }
  ];

  const filtered = techProducts.filter(p => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const brandMatch = activeBrand === "All" || p.brand === activeBrand;
    const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && brandMatch && searchMatch;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-900 py-16 px-4 md:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold font-serif italic tracking-tighter">Tech Products</h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">Premium peripherals and audio gear for the modern setup.</p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto py-12 px-4 md:px-8">
        <div className="lg:hidden mb-8">
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full py-4 bg-white border border-black/5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-sm"
          >
            <Filter size={14} /> {isFiltersOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`${isFiltersOpen ? "block" : "hidden"} lg:block w-full lg:w-72 space-y-8`}>
            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-8">
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Search</h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-delta-primary/20 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Categories</h4>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button 
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeCategory === cat.name ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Brands</h4>
                <div className="flex flex-wrap gap-2">
                  {brands.map(brand => (
                    <button 
                      key={brand}
                      onClick={() => setActiveBrand(brand)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeBrand === brand ? 'bg-delta-primary text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 space-y-8">
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Showing {filtered.length} Products</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort:</span>
                <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none text-delta-primary cursor-pointer">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map(w => (
                <motion.div layout key={w.id} onClick={() => onProductClick(w)} className="bg-white rounded-3xl border border-black/5 soft-shadow overflow-hidden group hover-lift cursor-pointer">
                  <div className="relative aspect-square overflow-hidden bg-slate-50">
                    <img src={w.img} alt={w.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900 shadow-sm">{w.brand}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onToggleLike(w); }} className={`absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm transition-colors ${likedItems.find((m: any) => m.id === w.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}>
                      <Heart size={18} fill={likedItems.find((m: any) => m.id === w.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{w.category}</p>
                        <h3 className="font-bold text-slate-900 group-hover:text-delta-primary transition-colors line-clamp-1">{w.name}</h3>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < Math.floor(w.rating) ? "currentColor" : "none"} className={i < Math.floor(w.rating) ? "" : "text-slate-200"} />
                      ))}
                    </div>
                    <p className="text-xl font-black text-slate-900">₹{w.price.toLocaleString()}</p>
                    <div className="pt-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onAddToCart(w); }}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-delta-primary transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
                      >
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 bg-slate-900 rounded-[3rem] p-12 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Need Tech Support?</h2>
            <p className="text-white/80 text-lg">From hardware repairs to software installation, our experts are here to help you with all your tech needs.</p>
          </div>
          <button className="relative z-10 px-12 py-5 bg-white text-slate-900 font-black rounded-full hover:bg-slate-50 transition-all uppercase tracking-widest text-xs shadow-2xl">
            Book Repair Service
          </button>
        </div>
      </section>
    </div>
  );
}

function GiftsView({ setView, onAddToCart, likedItems, onToggleLike, onProductClick }: any) {
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFor, setActiveFor] = useState("All");
  const [activeAge, setActiveAge] = useState("All");
  const [activeGender, setActiveGender] = useState("All");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const gifts = [
    { id: 201, name: "Customized Photo Mug", category: "Normal Gifts", for: "Friend", price: 499, rating: 4.8, img: "https://picsum.photos/seed/gift-1/600/800", desc: "A classic ceramic mug personalized with your favorite memories." },
    { id: 202, name: "Premium Leather Wallet", category: "Normal Gifts", for: "Senior", price: 1899, rating: 4.9, img: "https://picsum.photos/seed/gift-2/600/800", desc: "Handcrafted genuine leather wallet with RFID protection." },
    { id: 203, name: "Personalized Desk Organizer", category: "Stationery Gifts", for: "Teacher", price: 1200, rating: 4.7, img: "https://picsum.photos/seed/gift-3/600/800", desc: "Keep your workspace tidy with this custom engraved wooden organizer." },
    { id: 204, name: "Elegant Silk Scarf", category: "Normal Gifts", for: "Family", price: 950, rating: 4.6, img: "https://picsum.photos/seed/gift-4/600/800", desc: "Soft, luxurious silk scarf with intricate floral patterns." },
    { id: 205, name: "Engraved Fountain Pen Set", category: "Stationery Gifts", for: "Senior", price: 2500, rating: 5.0, img: "https://picsum.photos/seed/gift-5/600/800", desc: "A timeless writing instrument set for the distinguished professional." },
    { id: 206, name: "Handmade Scented Candles", category: "Normal Gifts", for: "Friend", price: 650, rating: 4.5, img: "https://picsum.photos/seed/gift-6/600/800", desc: "Soy-based candles with calming lavender and vanilla scents." },
    { id: 207, name: "Custom Name Diary", category: "Stationery Gifts", for: "Teacher", price: 450, rating: 4.8, img: "https://picsum.photos/seed/gift-7/600/800", desc: "A high-quality notebook with your name embossed on the cover." },
    { id: 208, name: "Digital Photo Frame", category: "Normal Gifts", for: "Family", price: 4500, rating: 4.9, img: "https://picsum.photos/seed/gift-8/600/800", desc: "Display thousands of photos in a beautiful high-resolution frame." },
    { id: 209, name: "Artistic Table Clock", category: "Normal Gifts", for: "Senior", price: 1500, rating: 4.7, img: "https://picsum.photos/seed/gift-9/600/800", desc: "A unique, modern clock design that doubles as a piece of art." },
    { id: 210, name: "Luxury Stationery Box", category: "Stationery Gifts", for: "Teacher", price: 3200, rating: 5.0, img: "https://picsum.photos/seed/gift-10/600/800", desc: "The ultimate collection for stationery lovers, presented in a premium box." }
  ];

  const filtered = gifts.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || g.category === activeCategory;
    const matchesFor = activeFor === "All" || g.for === activeFor;
    return matchesSearch && matchesCategory && matchesFor;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setActiveFor("All");
    setActiveAge("All");
    setActiveGender("All");
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://picsum.photos/seed/gift-hero/1920/1080?blur=5" className="w-full h-full object-cover opacity-20" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50" />
        </div>
        <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-slate-900/10 text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">The Art of Gifting</span>
            <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter text-slate-900 leading-none">Curated <span className="text-delta-primary">&</span> Personalized</h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">Discover a world where every gift tells a story. Handpicked, customized, and wrapped with love.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="flex flex-wrap items-center justify-center gap-4">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-delta-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="What are you looking for?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-8 py-5 bg-white border border-slate-100 rounded-full text-sm shadow-2xl shadow-slate-200/50 focus:ring-4 focus:ring-delta-primary/5 outline-none transition-all" 
              />
            </div>
          </motion.div>
        </div>

        {/* Floating Icons */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [12, 15, 12] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 hidden xl:block"
        >
          <div className="w-24 h-24 bg-rose-100 rounded-[2rem] flex items-center justify-center text-rose-400 shadow-xl">
            <Gift size={40} />
          </div>
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [-12, -15, -12] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 hidden xl:block"
        >
          <div className="w-32 h-32 bg-amber-50 rounded-[3rem] flex items-center justify-center text-amber-400 shadow-xl">
            <Sparkles size={48} />
          </div>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-slate-50/80 backdrop-blur-xl border-y border-black/5 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-8">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex bg-white p-1 rounded-2xl border border-black/5 shadow-sm">
              {["All", "Normal Gifts", "Stationery Gifts"].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="h-8 w-px bg-black/5 hidden md:block" />
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">For:</span>
              <div className="flex flex-wrap gap-2">
                {["All", "Teacher", "Senior", "Friend", "Family", "Partner"].map(f => (
                  <button 
                    key={f}
                    onClick={() => setActiveFor(f)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold border transition-all ${activeFor === f ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-white border-black/5 text-slate-600 hover:border-slate-200'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={resetFilters} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline">Reset Filters</button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1600px] mx-auto py-20 px-4 md:px-8">
        <div className="xl:hidden mb-12">
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full py-5 bg-white border border-black/5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-sm"
          >
            <Filter size={16} /> {isFiltersOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col xl:flex-row gap-16">
          {/* Sidebar */}
          <aside className={`${isFiltersOpen ? "block" : "hidden"} xl:block w-full xl:w-80 space-y-12`}>
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                  <div className="w-6 h-px bg-delta-primary" /> Age Group
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: "All", range: "" },
                    { name: "Kids", range: "(0-12)" },
                    { name: "Teens", range: "(13-19)" },
                    { name: "Adults", range: "(20-50)" },
                    { name: "Seniors", range: "(50+)" }
                  ].map(age => (
                    <button 
                      key={age.name}
                      onClick={() => setActiveAge(age.name)}
                      className={`group flex items-center justify-between p-4 rounded-3xl border-2 transition-all ${activeAge === age.name ? 'border-delta-primary bg-delta-primary/5' : 'border-white bg-white hover:border-slate-100 shadow-sm'}`}
                    >
                      <div className="flex flex-col items-start">
                        <span className={`text-sm font-bold ${activeAge === age.name ? 'text-delta-primary' : 'text-slate-600'}`}>{age.name}</span>
                        <span className="text-[10px] font-medium text-slate-400">{age.range}</span>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeAge === age.name ? 'bg-delta-primary text-white' : 'bg-slate-50 text-slate-300 group-hover:bg-slate-100'}`}>
                        <ChevronRight size={14} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                  <div className="w-6 h-px bg-delta-primary" /> Gender
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["All", "Male", "Female", "Unisex"].map(gender => (
                    <button 
                      key={gender}
                      onClick={() => setActiveGender(gender)}
                      className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border-2 ${activeGender === gender ? 'border-delta-primary bg-delta-primary text-white shadow-xl shadow-delta-primary/20' : 'border-white bg-white text-slate-600 hover:border-slate-100 shadow-sm'}`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 rounded-[3rem] p-8 text-white space-y-6 relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                  <h4 className="text-2xl font-serif italic leading-tight">Make it truly <span className="text-delta-primary">yours.</span></h4>
                  <p className="text-xs text-white/50 leading-relaxed font-medium">Every gift can be personalized with custom messages, wrapping, and boxing.</p>
                  <button 
                    onClick={() => setView("blogs")}
                    className="w-full py-4 bg-delta-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-delta-primary/20"
                  >
                    See Blogs
                  </button>
                </div>
                <Sparkles className="absolute -right-10 -bottom-10 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-700" size={120} />
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filtered.map((R, F) => (
                <motion.div layout key={R.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: F * 0.1 }} onClick={() => onProductClick(R)} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-50 shadow-2xl shadow-black/5 mb-6">
                    <img src={R.img} alt={R.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-8 left-8 flex flex-col gap-3">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-xl">{R.category}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onToggleLike(R); }} className={`absolute top-8 right-8 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 ${likedItems.find((X: any) => X.id === R.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}>
                      <Heart size={20} fill={likedItems.find((X: any) => X.id === R.id) ? 'currentColor' : 'none'} />
                    </button>
                    <div className="absolute bottom-8 left-8 right-8 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 flex gap-3">
                      <button onClick={(e) => { e.stopPropagation(); onAddToCart(R); }} className="flex-1 py-3 bg-white text-slate-900 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-2xl">Quick Add</button>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedGift(R); }} className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition-all">
                        <Sparkles size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4 px-6">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">For {R.for}</p>
                        <h3 className="text-xl font-serif italic text-slate-900 tracking-tight group-hover:text-delta-primary transition-colors">{R.name}</h3>
                      </div>
                      <p className="text-xl font-black text-slate-900">₹{R.price.toLocaleString()}</p>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{R.desc}</p>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex gap-0.5 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < Math.floor(R.rating) ? "currentColor" : "none"} className={i < Math.floor(R.rating) ? "" : "text-slate-200"} />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{R.rating} Rating</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-32 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-slate-900">Can't decide?</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Let our experts help you curate the perfect gift box for any occasion.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-delta-primary transition-all shadow-2xl shadow-slate-900/20">Chat with a Stylist</button>
            <button className="px-12 py-6 bg-white border-2 border-slate-100 text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:border-delta-primary transition-all shadow-xl">Gift Guide 2024</button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedGift && <GiftCustomizationModal product={selectedGift} onClose={() => setSelectedGift(null)} onAddToCart={onAddToCart} />}
      </AnimatePresence>
    </div>
  );
}

function CartView({ items, onRemove, onUpdateQty, setView, likedItems, onAddToCart, onToggleLike }: any) {
  const subtotal = items.reduce((acc: number, item: any) => acc + (item.price * item.qty), 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Your Shopping Cart</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{items.length} ITEMS READY FOR CHECKOUT</p>
          </div>
          <div className="flex flex-wrap gap-4 border-b border-slate-200 pb-8">
            <button className="px-8 py-4 bg-black text-white rounded-lg font-bold text-xs flex items-center gap-3 shadow-lg shadow-black/20">
              <ShoppingCart size={16} fill="currentColor" /> CART OVERVIEW
            </button>
            <button onClick={() => setView("liked")} className="px-8 py-4 bg-white text-slate-400 border border-slate-100 rounded-lg font-bold text-xs flex items-center gap-3 hover:bg-slate-50 transition-all">
              <Heart size={16} /> SAVED ITEMS
            </button>
            <button className="px-8 py-4 bg-white text-slate-400 border border-slate-100 rounded-lg font-bold text-xs flex items-center gap-3 hover:bg-slate-50 transition-all">
              <Clock size={16} /> ORDER HISTORY
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-4">
            {items.length > 0 ? items.map((item: any) => {
              const isLiked = likedItems.some((l: any) => l.id === item.id);
              return (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-black/5 shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row gap-6 group hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)] transition-all duration-500">
                  <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 relative group/img">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-2 right-2 translate-x-10 group-hover/img:translate-x-0 transition-transform duration-300">
                      <button 
                        onClick={() => onToggleLike(item)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm bg-white ${isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                      >
                        <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-0.5">
                          <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-delta-primary transition-colors">{item.name}</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PREMIUM SERIES / LIMITED EDITION</p>
                        </div>
                        <p className="text-lg font-black text-slate-900">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                      <div className="flex items-center bg-slate-50 rounded-lg border border-slate-100 p-0.5">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-delta-primary transition-colors"><Minus size={14} /></button>
                        <span className="text-xs font-black w-8 text-center text-slate-900">{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-delta-primary transition-colors"><Plus size={14} /></button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="flex items-center gap-1.5 text-[9px] font-black text-red-500 uppercase tracking-widest hover:bg-red-50 px-3 py-1.5 rounded-full transition-all">
                        <Trash2 size={12} /> REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="bg-white p-12 rounded-[2rem] border border-black/5 text-center space-y-6">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto">
                  <ShoppingCart size={48} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Your cart is empty</h3>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">SAVED ITEMS ({likedItems.length})</h3>
              <div className="space-y-6">
                {likedItems.length > 0 ? (
                  likedItems.slice(0, 3).map((item: any) => (
                    <div key={item.id} className="flex gap-4 group cursor-pointer">
                      <div className="w-20 h-20 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="text-[11px] font-black text-slate-900 leading-tight tracking-wide uppercase">{item.name}</h4>
                        <button onClick={() => onAddToCart(item)} className="text-[10px] font-black text-delta-primary uppercase tracking-widest hover:underline">MOVE TO CART</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 font-bold">No saved items yet.</p>
                )}
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button onClick={() => setView("liked")} className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:text-delta-primary transition-colors">
                  VIEW ALL SAVED <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="bg-[#f1f3f5] p-10 rounded-[2rem] border border-black/5 space-y-10">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">ORDER SUMMARY</h3>
              <div className="space-y-6">
                <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-widest">
                  <span>SUBTOTAL</span>
                  <span className="text-slate-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-widest">
                  <span>GST (18%)</span>
                  <span className="text-slate-900">₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-widest">
                  <span>SHIPPING</span>
                  <span className="text-green-600">FREE</span>
                </div>
              </div>
              <div className="pt-8 border-t border-slate-200 flex justify-between items-end">
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">TOTAL</span>
                <span className="text-5xl font-black text-slate-900">₹{total.toLocaleString()}</span>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DISCOUNT CODE</p>
                <div className="flex gap-2">
                  <input placeholder="DELTA20" className="flex-1 bg-white/50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-delta-primary/20 transition-all" type="text" />
                  <button className="bg-black text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all">APPLY</button>
                </div>
              </div>
              <div className="space-y-6">
                <button className="w-full py-5 bg-black text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-black/20">
                  PROCEED TO CHECKOUT
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Shield size={14} /> SECURE CHECKOUT VIA SSL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LikedView({ items, onAddToCart, onToggleLike, onProductClick }: any) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Saved Items</h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{items.length} ITEMS IN YOUR WISHLIST</p>
        </div>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((r: any) => (
              <motion.div layout key={r.id} onClick={() => onProductClick(r)} className="bg-white rounded-3xl border border-slate-100 soft-shadow overflow-hidden group hover-lift cursor-pointer">
                <div className="relative aspect-square overflow-hidden bg-slate-50">
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <button onClick={(e) => { e.stopPropagation(); onToggleLike(r); }} className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 shadow-sm">
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{r.category || r.brand}</p>
                    <h3 className="font-bold text-slate-900 line-clamp-1">{r.name}</h3>
                  </div>
                  <p className="text-xl font-black text-delta-primary">₹{r.price.toLocaleString()}</p>
                  <div className="pt-2 flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); onAddToCart(r); }} className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-delta-primary transition-all flex items-center justify-center gap-2">
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onToggleLike(r); }} className="w-12 py-3 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-20 rounded-[3rem] border border-black/5 text-center space-y-6">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto">
              <Heart size={48} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Your wishlist is empty</h3>
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardView({ user, setView }: any) {
  return (
    <main className="pt-16">
      <div className="min-h-screen bg-slate-50/50 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">User Dashboard</h1>
              <p className="text-slate-500 font-medium">Welcome back, <span className="text-delta-primary font-bold">{user.name}</span>! Here's what's happening.</p>
            </div>
            <button 
              onClick={() => setView("profile")}
              className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:text-delta-primary hover:border-delta-primary transition-all shadow-sm flex items-center gap-2"
            >
              <User size={14} /> Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-black/5 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                <ShoppingBag size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Orders</p>
                <p className="text-2xl font-black text-slate-900">12</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-black/5 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
                <Heart size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Saved Items</p>
                <p className="text-2xl font-black text-slate-900">8</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-black/5 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Courses Enrolled</p>
                <p className="text-2xl font-black text-slate-900">3</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-black/5 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
                <Star size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reward Points</p>
                <p className="text-2xl font-black text-slate-900">450</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Orders</h2>
                <button className="text-xs font-bold text-delta-primary hover:underline">View All</button>
              </div>
              <div className="bg-white rounded-[2rem] border border-black/5 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-slate-900">#ORD-7721</td>
                        <td className="px-6 py-4 text-xs text-slate-500">Oct 12, 2023</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-50 text-green-600">Delivered</span>
                        </td>
                        <td className="px-6 py-4 text-xs font-black text-slate-900">₹2,450</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-delta-primary transition-colors">
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-slate-900">#ORD-7690</td>
                        <td className="px-6 py-4 text-xs text-slate-500">Sep 28, 2023</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-50 text-amber-600">Processing</span>
                        </td>
                        <td className="px-6 py-4 text-xs font-black text-slate-900">₹1,299</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-delta-primary transition-colors">
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-slate-900">#ORD-7655</td>
                        <td className="px-6 py-4 text-xs text-slate-500">Sep 15, 2023</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-50 text-green-600">Delivered</span>
                        </td>
                        <td className="px-6 py-4 text-xs font-black text-slate-900">₹850</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-delta-primary transition-colors">
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Account Overview</h2>
              <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                  <div className="rounded-full overflow-hidden bg-slate-200 border border-black/10 flex items-center justify-center relative rounded-2xl" style={{ width: "64px", height: "64px" }}>
                    <Avatar index={user.avatarIndex} size={64} />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin size={16} className="text-slate-400" />
                    <p className="text-xs font-medium leading-relaxed">123, Delta Street, Stationery Hub, New Delhi, Delhi</p>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Smartphone size={16} className="text-slate-400" />
                    <p className="text-xs font-medium">+91 98765 43210</p>
                  </div>
                </div>
                <button 
                  onClick={() => setView("profile")}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-delta-primary transition-all shadow-lg shadow-slate-900/10"
                >
                  Update Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProfileView({ user, setUser, setView }: any) {
  const [formData, setFormData] = useState(user);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setUser(formData);
    setView("dashboard");
  };

  return (
    <main className="pt-16">
      <div className="min-h-screen bg-slate-50/50 py-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView("dashboard")}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-delta-primary hover:border-delta-primary transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Profile</h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">MANAGE YOUR ACCOUNT SETTINGS</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-black/5 shadow-sm">
            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-slate-100">
                <div className="relative group">
                  <div 
                    className="w-32 h-32 rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-300 overflow-hidden border-4 border-white shadow-xl cursor-pointer"
                    onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  >
                    <Avatar index={formData.avatarIndex} size={128} className="rounded-[2rem]" />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-delta-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-delta-primary/30 hover:scale-110 transition-all"
                  >
                    <ImageIcon size={18} />
                  </button>

                  <AnimatePresence>
                    {showAvatarPicker && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-4 p-4 bg-white rounded-3xl shadow-2xl border border-black/5 z-50 w-64 grid grid-cols-4 gap-2"
                      >
                        {AVATARS.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, avatarIndex: i });
                              setShowAvatarPicker(false);
                            }}
                            className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${formData.avatarIndex === i ? 'border-delta-primary' : 'border-transparent hover:border-slate-200'}`}
                          >
                            <Avatar index={i} size={48} />
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-black text-slate-900">Profile Avatar</h3>
                  <p className="text-xs text-slate-400 font-medium max-w-[240px]">Choose your favorite character from our exclusive collection.</p>
                  <button 
                    type="button" 
                    onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                    className="text-[10px] font-black text-delta-primary uppercase tracking-widest hover:underline"
                  >
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all" 
                    placeholder="Enter your name" 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all" 
                    placeholder="Enter your email" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all" 
                    placeholder="Enter your phone" 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Address Details</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">House No.</label>
                      <input 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all" 
                        placeholder="House No." 
                        type="text" 
                        value={formData.address.houseNo}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, houseNo: e.target.value } })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Street</label>
                      <input 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all" 
                        placeholder="Street" 
                        type="text" 
                        value={formData.address.street}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Locality</label>
                      <input 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all" 
                        placeholder="Locality" 
                        type="text" 
                        value={formData.address.locality}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, locality: e.target.value } })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">City</label>
                      <input 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all" 
                        placeholder="City" 
                        type="text" 
                        value={formData.address.city}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                        required
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">State</label>
                      <input 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-delta-primary/20 outline-none transition-all" 
                        placeholder="State" 
                        type="text" 
                        value={formData.address.state}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-100 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900">Payment Methods</h3>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">MANAGE YOUR SAVED CARDS</p>
                  </div>
                  <button type="button" className="px-4 py-2 bg-slate-50 text-delta-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-delta-primary/10 transition-all flex items-center gap-2">
                    <Plus size={14} /> Add New Card
                  </button>
                </div>
                <div className="grid gap-4">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-[10px]">Visa</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">•••• •••• •••• 4242</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Expires 12/26</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-2 py-1 bg-green-50 text-green-600 text-[8px] font-black uppercase tracking-widest rounded">Default</span>
                      <button type="button" className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-[10px]">Mastercard</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">•••• •••• •••• 8812</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Expires 09/25</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button type="button" className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-10 py-4 bg-delta-secondary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  Save Profile <ArrowRight size={16} />
                </button>
                <button 
                  type="button" 
                  onClick={() => setView("dashboard")}
                  className="w-full sm:w-auto px-10 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 hover:text-slate-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

function GiftCustomizationModal({ product, onClose, onAddToCart }: any) {
  const [wrap, setWrap] = useState("Classic");
  const [box, setBox] = useState("Standard");
  const [extra, setExtra] = useState("None");
  const [step, setStep] = useState(1);

  const wraps = [
    { name: "Classic", price: 50, img: "https://picsum.photos/seed/wrap-1/400/400", desc: "Elegant paper with a silk ribbon." },
    { name: "Premium", price: 150, img: "https://picsum.photos/seed/wrap-2/400/400", desc: "Textured velvet wrap with gold accents." },
    { name: "Luxury", price: 300, img: "https://picsum.photos/seed/wrap-3/400/400", desc: "Hand-painted artisanal paper and dried flowers." }
  ];

  const boxes = [
    { name: "Standard", price: 0, img: "https://picsum.photos/seed/box-1/400/400", desc: "Sturdy matte white box." },
    { name: "Eco-friendly", price: 40, img: "https://picsum.photos/seed/box-2/400/400", desc: "Recycled kraft paper box with hemp twine." },
    { name: "Wooden Crate", price: 250, img: "https://picsum.photos/seed/box-3/400/400", desc: "Hand-crafted pine wood crate for a rustic feel." }
  ];

  const totalPrice = product.price + (wraps.find(w => w.name === wrap)?.price || 0) + (boxes.find(b => b.name === box)?.price || 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
      <motion.div 
        initial={{ opacity: 0, y: 100 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-6xl h-full md:h-[90vh] bg-white md:rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row"
      >
        <button onClick={onClose} className="absolute top-8 right-8 z-50 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-xl">
          <X size={24} />
        </button>

        <div className="w-full lg:w-1/2 bg-slate-900 p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,#3b82f6_0%,transparent_50%)]" />
          </div>
          <div className="space-y-4 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Personalization Studio</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-tight">Crafting your <br /> perfect gift.</h2>
          </div>
          <div className="relative aspect-square max-w-md mx-auto group">
            <motion.div layoutId={`product-img-${product.id}`} className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl relative z-10 bg-white">
              <img src={product.img} alt="Product" className="w-full h-full object-cover" />
            </motion.div>
          </div>
          <div className="space-y-1 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Investment</p>
            <p className="text-4xl font-black text-white">₹{totalPrice.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex-1 p-12 overflow-y-auto custom-scrollbar bg-white space-y-12">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif italic text-slate-900">Choose the Wrap</h3>
                <p className="text-sm text-slate-500 font-medium">Select a wrapping style that matches the occasion.</p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {wraps.map(X => (
                  <button key={X.name} onClick={() => setWrap(X.name)} className={`group flex items-center gap-6 p-6 rounded-[2.5rem] border-2 transition-all text-left ${wrap === X.name ? 'border-delta-primary bg-slate-50 shadow-2xl shadow-delta-primary/5' : 'border-transparent bg-slate-50 hover:border-slate-200 shadow-sm'}`}>
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                      <img src={X.img} alt={X.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-slate-900">{X.name}</p>
                        <p className="text-sm font-black text-slate-900">₹{X.price}</p>
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{X.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-delta-primary transition-all shadow-xl">Next: Packaging</button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif italic text-slate-900">Packaging Style</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {boxes.map(X => (
                  <button key={X.name} onClick={() => setBox(X.name)} className={`p-4 rounded-3xl border-2 transition-all text-center space-y-3 ${box === X.name ? 'border-delta-primary bg-slate-50 shadow-xl' : 'border-transparent bg-slate-50 hover:border-slate-200'}`}>
                    <div className="aspect-square rounded-2xl overflow-hidden bg-white">
                      <img src={X.img} alt={X.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] font-black text-slate-900 uppercase">{X.name}</p>
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-6 bg-slate-50 border border-slate-100 text-slate-600 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all">Back</button>
                <button onClick={() => { onAddToCart({ ...product, price: totalPrice }); onClose(); }} className="flex-[2] py-6 bg-delta-primary text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-2xl shadow-delta-primary/30">Complete & Add to Cart</button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ComingSoonView({ setView, onBlogClick }: any) {
  const allBlogs = BLOG_CATEGORIES.flatMap(c => c.blogs);
  const popularPosts = allBlogs.slice(0, 4);
  const giftPicks = ALL_PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        {/* Main Content */}
        <div className="flex-1 space-y-24">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Coming Soon</h1>
            <p className="text-slate-500 font-medium">Exciting updates and opportunities on the horizon.</p>
          </div>

          {/* Coming Soon Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center md:justify-items-start">
            {/* Job Application Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-black/5 rounded-[2rem] p-8 shadow-lg shadow-black/5 flex flex-col items-center text-center space-y-6 relative overflow-hidden group w-full max-w-[320px]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 relative z-10">
                <Briefcase size={32} />
              </div>
              <div className="space-y-3 relative z-10">
                <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight uppercase">Job <br /> Application</h2>
                <div className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest">Coming Soon</div>
                <p className="text-slate-500 text-[11px] font-bold leading-relaxed">Stay tuned for exciting opportunities in retail, education, and tech services.</p>
              </div>
              <button className="relative z-10 w-full py-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-delta-primary transition-all duration-300">Apply</button>
            </motion.div>

            {/* New Course Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-black/5 rounded-[2rem] p-8 shadow-lg shadow-black/5 flex flex-col items-center text-center space-y-6 relative overflow-hidden group w-full max-w-[320px]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 relative z-10">
                <GraduationCap size={32} />
              </div>
              <div className="space-y-3 relative z-10">
                <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight uppercase">New <br /> Course</h2>
                <div className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest">Coming Soon</div>
                <p className="text-slate-500 text-[11px] font-bold leading-relaxed">Advanced certifications and hands-on workshops launching very soon.</p>
              </div>
              <button className="relative z-10 w-full py-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-delta-primary transition-all duration-300">Get Notified</button>
            </motion.div>
          </div>
        </div>

        {/* Sidebar */}
        <BlogSidebar 
          setView={setView} 
          popularPosts={popularPosts} 
          giftPicks={giftPicks} 
          onBlogClick={onBlogClick} 
          showGifts={false}
        />
      </div>
    </div>
  );
}

function BlogSidebar({ setView, popularPosts, giftPicks, onBlogClick, showPopular = true, showGifts = true }: any) {
  return (
    <aside className="w-full lg:w-80 space-y-16">
      {/* Popular Posts */}
      {showPopular && (
        <div className="space-y-8">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
            <div className="w-6 h-px bg-delta-primary" /> Popular Posts
          </h3>
          <div className="space-y-6">
            {popularPosts.map((post: any) => (
              <div 
                key={post.id} 
                onClick={() => onBlogClick(post)}
                className="group cursor-pointer flex gap-4 items-center"
              >
                <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border border-black/5 flex-shrink-0">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-delta-primary transition-colors">{post.title}</h4>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Gift Picks */}
      {showGifts && (
        <div className="space-y-8">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
            <div className="w-6 h-px bg-delta-primary" /> Top Gift Picks
          </h3>
          <div className="space-y-6">
            {giftPicks.map((gift: any) => (
              <div 
                key={gift.id} 
                onClick={() => setView("shop")}
                className="group cursor-pointer flex gap-4 items-center"
              >
                <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border border-black/5 flex-shrink-0">
                  <img src={gift.img} alt={gift.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-delta-primary transition-colors">{gift.name}</h4>
                  <p className="text-[10px] font-black text-delta-primary uppercase tracking-widest">₹{gift.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6">
        <div className="space-y-2">
          <h4 className="text-xl font-bold tracking-tight">Stay Updated</h4>
          <p className="text-xs text-white/50 leading-relaxed">Subscribe to our newsletter for the latest stories and gift ideas.</p>
        </div>
        <div className="space-y-3">
          <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/5 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-delta-primary outline-none transition-all" />
          <button className="w-full py-3 bg-delta-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Subscribe</button>
        </div>
      </div>
    </aside>
  );
}

function BlogView({ setView, onBlogClick }: any) {
  const allBlogs = BLOG_CATEGORIES.flatMap(c => c.blogs);
  const popularPosts = allBlogs.slice(0, 4);
  const giftPicks = ALL_PRODUCTS.filter(p => p.view === "gifts").slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        {/* Main Content */}
        <div className="flex-1 space-y-16">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Delta Blog</h1>
            <p className="text-slate-500 font-medium">Stories, guides, and insights from our team.</p>
          </div>

          <div className="space-y-20">
            {BLOG_CATEGORIES.map((category, catIdx) => (
              <div key={catIdx} className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-delta-primary" />
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">{category.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {category.blogs.map((blog, idx) => (
                    <motion.div 
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => onBlogClick(blog)}
                      className="group cursor-pointer space-y-4"
                    >
                      <div className="aspect-[16/10] bg-white rounded-[2rem] overflow-hidden border border-black/5 shadow-sm relative">
                        <img 
                          src={blog.img} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{blog.date}</p>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-delta-primary transition-colors leading-snug line-clamp-2">{blog.title}</h3>
                        <button className="text-[10px] font-black text-delta-primary uppercase tracking-[0.2em] hover:underline pt-2">Read Article</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <BlogSidebar 
          setView={setView} 
          popularPosts={popularPosts} 
          giftPicks={giftPicks} 
          onBlogClick={onBlogClick} 
          showGifts={false}
        />
      </div>
    </div>
  );
}

function BlogDetailView({ blog, setView, onBlogClick }: any) {
  const allBlogs = BLOG_CATEGORIES.flatMap(c => c.blogs);
  const popularPosts = allBlogs.slice(0, 4);
  const giftPicks = ALL_PRODUCTS.filter(p => p.view === "gifts").slice(0, 4);
  const relatedBlogs = allBlogs.filter(b => b.id !== blog.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Blog Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={blog.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{blog.date}</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">{blog.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 flex flex-col lg:flex-row gap-16">
        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <button 
            onClick={() => setView("blogs")}
            className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-delta-primary transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Blogs
          </button>

          <article className="prose prose-slate prose-xl max-w-none bg-white p-8 md:p-12 rounded-[3rem] border border-black/5 shadow-sm">
            <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12 border-l-4 border-delta-primary pl-8 py-2">
              {blog.content}
            </p>
            <div className="space-y-8 text-slate-700 leading-relaxed font-medium">
              <p>
                In today's fast-paced world, finding moments of genuine connection and creative expression is more important than ever. Whether you're carefully selecting a gift that reflects a deep personal bond, or setting up a workspace that inspires your best ideas, the details always matter.
              </p>
              <p>
                At Delta, we believe that quality and thoughtfulness go hand-in-hand. Our curated selection of products and services is designed to help you live a better, more creative life. From the perfect gaming keyboard to a personalized gift box, we're here to support your journey.
              </p>
            </div>

            {/* Share Section */}
            <div className="mt-20 py-12 border-y border-black/5 flex flex-wrap items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Written by</p>
                  <p className="text-sm font-bold text-slate-900">Delta Editorial Team</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </article>

          {/* Related Posts */}
          <div className="mt-20 space-y-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">More Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedBlogs.map((rb: any) => (
                <div 
                  key={rb.id} 
                  onClick={() => onBlogClick(rb)}
                  className="group cursor-pointer space-y-4"
                >
                  <div className="aspect-video rounded-[2rem] overflow-hidden border border-black/5 bg-white">
                    <img src={rb.img} alt={rb.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-delta-primary transition-colors line-clamp-2">{rb.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <BlogSidebar 
          setView={setView} 
          popularPosts={popularPosts} 
          giftPicks={giftPicks} 
          onBlogClick={onBlogClick} 
        />
      </div>
    </div>
  );
}

function MobileMenu({ isOpen, onClose, setView, lang, setLang }: any) {
  const menuItems = [
    { id: "home", label: "Home", icon: <Home size={20} /> },
    { id: "shop", label: "Shop", icon: <List size={20} /> },
    { id: "courses", label: "Courses", icon: <BookOpen size={20} /> },
    { id: "services", label: "Services", icon: <Settings size={20} /> },
    { id: "printing", label: "Printing", icon: <Printer size={20} /> },
    { id: "tech", label: "Tech", icon: <Keyboard size={20} /> },
    { id: "blogs", label: "Blogs", icon: <FileText size={20} /> },
    { id: "gifts", label: "Gifts", icon: <Gift size={20} /> },
    { id: "contact", label: "Contact", icon: <Mail size={20} /> }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-full max-w-[350px] bg-white z-[101] flex flex-col shadow-2xl"
          >
            <div className="p-8 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-delta-primary rounded-xl flex items-center justify-center text-white font-black">Δ</div>
                <h2 className="text-xl font-bold tracking-tighter text-slate-900">DELTA</h2>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              <div className="space-y-1">
                {menuItems.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => { setView(item.id); onClose(); }}
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-delta-primary transition-all group"
                  >
                    <div className="text-slate-300 group-hover:text-delta-primary transition-colors">
                      {item.icon}
                    </div>
                    <span className="font-bold text-sm">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-8 border-t border-black/5 space-y-6">
                <div className="space-y-3 px-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Language</p>
                  <div className="flex gap-2">
                    {["en", "hi"].map(l => (
                      <button 
                        key={l}
                        onClick={() => setLang(l)}
                        className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${lang === l ? 'bg-delta-primary text-white shadow-lg shadow-delta-primary/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                      >
                        {l === "en" ? "English" : "हिंदी"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-black/5 bg-slate-50/50">
              <button onClick={() => { setView("dashboard"); onClose(); }} className="w-full py-4 bg-white border border-black/5 rounded-2xl font-bold text-xs flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all text-slate-900">
                <User size={16} /> MY ACCOUNT
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQty, onViewCart, likedItems, onToggleLike }: any) {
  const subtotal = items.reduce((acc: number, item: any) => acc + (item.price * item.qty), 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 z-[100]"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white/70 backdrop-blur-2xl border-l border-black/5 shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Your Cart</h2>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-black/10 transition-all">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {items.length > 0 ? items.map((item: any) => {
                const isLiked = likedItems.some((l: any) => l.id === item.id);
                return (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 overflow-hidden flex-shrink-0 border border-black/5 shadow-sm relative group/img">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-1 right-1 translate-x-10 group-hover/img:translate-x-0 transition-transform duration-300">
                        <button 
                          onClick={() => onToggleLike(item)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm bg-white ${isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                        >
                          <Heart size={10} fill={isLiked ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-delta-primary transition-colors">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-slate-900">₹{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex items-center bg-slate-50 rounded-lg border border-black/5">
                          <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold w-8 text-center text-slate-900">{item.qty}</span>
                          <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingCart size={40} className="text-slate-200" />
                  <p className="font-bold text-slate-400">Your cart is empty</p>
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="p-6 bg-white/30 backdrop-blur-md border-t border-black/5 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>GST (18%)</span>
                    <span className="font-bold text-slate-900">₹{gst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-slate-900 pt-2 border-t border-black/5">
                    <span>Total</span>
                    <span className="text-slate-900">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="pt-2 space-y-3">
                  <button onClick={onViewCart} className="w-full py-4 bg-slate-50 border border-black/5 text-slate-900 rounded-2xl font-bold text-sm hover:bg-white transition-all shadow-sm flex items-center justify-center gap-2">
                    View Cart
                  </button>
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-delta-primary transition-all shadow-xl flex items-center justify-center gap-2 group">
                    Payment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">DELTA</h2>
          <p className="text-slate-400 leading-relaxed text-sm max-w-xs">Your trusted partner for quality stationery, expert computer services, and professional education.</p>
          <div className="flex gap-4">
            <Facebook size={20} className="text-slate-600 hover:text-white cursor-pointer" />
            <Twitter size={20} className="text-slate-600 hover:text-white cursor-pointer" />
            <Instagram size={20} className="text-slate-600 hover:text-white cursor-pointer" />
            <Youtube size={20} className="text-slate-600 hover:text-white cursor-pointer" />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-delta-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Our Faculty</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Shop Stationery</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Support</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-delta-primary transition-colors">Contact Support</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-delta-primary transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Stay Updated</h4>
          <p className="text-slate-400 mb-4 text-sm">Subscribe to get the latest news and offers.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded px-4 py-2 text-sm outline-none focus:border-delta-primary transition-colors flex-1 placeholder:text-slate-600" />
            <button className="bg-white text-slate-900 px-4 py-2 rounded text-sm font-bold hover:bg-delta-primary hover:text-white transition-all">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
        <p>© 2026 DELTA Institute & Stationery. All rights reserved.</p>
      </div>
    </footer>
  );
}
