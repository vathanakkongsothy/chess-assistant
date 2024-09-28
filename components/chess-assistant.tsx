'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, RotateCcw, Play, Pause, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ChessAssistant() {
  const [activeTab, setActiveTab] = useState("board")
  const [theme, setTheme] = useState<"cosmic" | "forest" | "sunset">("cosmic")

  const themeStyles: { [key in "cosmic" | "forest" | "sunset"]: string } = {
    cosmic: "from-purple-900 via-indigo-800 to-blue-900",
    forest: "from-green-900 via-emerald-800 to-teal-900",
    sunset: "from-red-900 via-orange-800 to-yellow-900",
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeStyles[theme]} text-gray-100 font-sans`}>
      <header className="py-8 mb-8">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Chess Maestro
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-2 text-gray-300 text-xl"
          >
            Your AI-powered chess companion
          </motion.p>
        </div>
      </header>
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700 rounded-xl overflow-hidden">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-2xl">Chessboard</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
                <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                  {[...Array(64)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.01 }}
                      className={`${
                        (Math.floor(i / 8) + i) % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                      } flex items-center justify-center`}
                    >
                      {i < 16 || i >= 48 ? (
                        <div className={`w-3/4 h-3/4 rounded-full ${i < 16 ? "bg-gray-300" : "bg-gray-900"} shadow-lg`} />
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-8">
            <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700 rounded-xl overflow-hidden">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-2xl">Game Info</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full border-b border-gray-700 bg-gray-800 bg-opacity-50">
                    <TabsTrigger value="board" className="w-full data-[state=active]:bg-gray-700">Moves</TabsTrigger>
                    <TabsTrigger value="analysis" className="w-full data-[state=active]:bg-gray-700">Analysis</TabsTrigger>
                  </TabsList>
                  <TabsContent value="board" className="p-4">
                    <div className="h-64 overflow-y-auto space-y-2 pr-2">
                      <AnimatePresence>
                        {[...Array(10)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="flex justify-between items-center bg-gray-700 bg-opacity-50 rounded-lg p-2"
                          >
                            <span className="font-medium text-gray-400">{i + 1}.</span>
                            <span className="text-blue-400 font-semibold">e4</span>
                            <span className="text-purple-400 font-semibold">e5</span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </TabsContent>
                  <TabsContent value="analysis" className="p-4">
                    <p className="text-gray-300">AI analysis in progress...</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700 rounded-xl overflow-hidden">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-2xl">Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button variant="outline" size="icon" className="bg-gray-700 hover:bg-gray-600 text-gray-200">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-gray-700 hover:bg-gray-600 text-gray-200">
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-gray-700 hover:bg-gray-600 text-gray-200">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-gray-700 hover:bg-gray-600 text-gray-200">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-gray-700 hover:bg-gray-600 text-gray-200">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="bg-gray-700 hover:bg-gray-600 text-gray-200">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-800 border-gray-700">
                      <DropdownMenuItem onClick={() => setTheme("cosmic")} className="text-gray-200 focus:bg-gray-700">
                        Cosmic Theme
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("forest")} className="text-gray-200 focus:bg-gray-700">
                        Forest Theme
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("sunset")} className="text-gray-200 focus:bg-gray-700">
                        Sunset Theme
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}