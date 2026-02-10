import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useGgpaCalculator } from '../features/ggpa/useGgpaCalculator';
import SemesterCard from '../features/ggpa/components/SemesterCard';
import ResultsCard from '../features/ggpa/components/ResultsCard';
import { SiFacebook } from 'react-icons/si';

export default function GgpaCalculatorPage() {
  const { semesters, addSemester } = useGgpaCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      {/* Header */}
      <header className="border-b border-teal-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">GGPA Calculator</h1>
          <p className="text-muted-foreground mt-2">Calculate your academic performance easily</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-6">
          {/* Semesters */}
          {semesters.map((semester) => (
            <SemesterCard key={semester.id} semester={semester} />
          ))}

          {/* Add Semester Button */}
          <Card className="border-2 border-dashed border-teal-200 bg-white/60 hover:bg-white/80 hover:border-teal-300 transition-all duration-200">
            <CardContent className="pt-6">
              <Button
                onClick={addSemester}
                variant="outline"
                className="w-full border-teal-300 text-teal-700 hover:bg-teal-50 hover:text-teal-800 transition-all duration-200"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Semester
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <ResultsCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-teal-100 bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} · Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'ggpa-calculator'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
