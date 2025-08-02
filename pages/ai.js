"use client"

import { useState } from "react"
import Head from "next/head"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Sparkles, Brain, Lightbulb, Zap } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import OpenAI from "openai"

export default function AISearchPage() {
  const [query, setQuery] = useState("")
  const [descriptions, setDescriptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a book title or topic.")
      return
    }

    setIsLoading(true)
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1",
        dangerouslyAllowBrowser: true,
      })

      toast.success("Fetching AI-powered insights...", { autoClose: 2000 })

      const prompt = `Provide a one-line description of the book related to: ${query}. Then, list only 2 related books max in the second line. If the input is not a book, provide a one-line description for a relevant topic and suggest 2 related books.`

      const response = await openai.chat.completions.create({
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      })

      const text = response.choices[0].message.content
      const formattedDescriptions = text
        .split(/\n/)
        .filter(Boolean)
        .map((desc) =>
          desc
            .replace(/\\(.?)\\*/g, "<strong>$1</strong>")
            .replace(/\* (.*?)$/gm, "<li>$1</li>")
            .replace(/Related Books/g, "<h3>Related Books</h3>"),
        )

      setDescriptions(formattedDescriptions)
    } catch (error) {
      console.error("Error fetching book description:", error)
      toast.error("Failed to fetch description. Please try again.")
      setDescriptions(["Failed to fetch description. Please try again."])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <>
      <Head>
        <title>BookHive | AI Assistant</title>
      </Head>

      <ToastContainer />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl mb-6 shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-700 bg-clip-text text-transparent mb-4">
              AI Book Assistant
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover book insights, recommendations, and detailed descriptions powered by artificial intelligence
            </p>
          </div>

          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Descriptions</h3>
                <p className="text-gray-600 text-sm">Get AI-generated book summaries and insights</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Book Recommendations</h3>
                <p className="text-gray-600 text-sm">Discover similar books based on your interests</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
                <p className="text-gray-600 text-sm">Get immediate AI-powered responses</p>
              </CardContent>
            </Card>
          </div>

          {/* Search Section */}
          <Card className="bg-white/80 border-gray-200 backdrop-blur-sm shadow-xl mb-8">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-2xl font-semibold">Search Books & Topics</span>
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Enter any book title, author name, or topic to get AI-powered insights and recommendations
              </p>
            </CardHeader>

            <CardContent>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-12 h-14 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 text-lg"
                    placeholder="Enter book title, author, or topic..."
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="h-14 px-8 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold text-lg shadow-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Search with AI
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {descriptions.length > 0 && (
            <Card className="bg-white/80 border-gray-200 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-gray-900">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-2xl font-semibold">AI Results</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                    Powered by AI
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {descriptions.map((desc, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg"
                  >
                    <div
                      className="text-gray-800 leading-relaxed"
                      style={{ whiteSpace: "pre-wrap" }}
                      dangerouslySetInnerHTML={{ __html: desc.trim() }}
                    />
                  </div>
                ))}

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Results generated by AI • Based on your search: "{query}"</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          <Card className="mt-8 bg-blue-50/50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                How to Use AI Assistant
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Search by Book Title</p>
                  <p>Enter the exact or partial title of any book</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Search by Author</p>
                  <p>Type an author's name to get book recommendations</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Search by Topic</p>
                  <p>Enter any subject or genre for related suggestions</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">Get Recommendations</p>
                  <p>Discover similar books and related topics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
