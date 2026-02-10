import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGgpaCalculator } from '../useGgpaCalculator';
import { formatGgpa, getPerformanceMessage } from '../ggpaMath';
import { Award, Calculator } from 'lucide-react';

export default function ResultsCard() {
  const { calculated, lastCalculatedResult, calculate, semesters } = useGgpaCalculator();

  // If not calculated yet, show the Calculate button
  if (!calculated || !lastCalculatedResult) {
    return (
      <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-sm">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Calculator className="h-12 w-12 text-teal-400 mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">
              Ready to see your CGPA? Click the button below to calculate.
            </p>
            <Button
              onClick={calculate}
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate CGPA
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If calculated but invalid, show error message
  if (!lastCalculatedResult.isValid) {
    return (
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Award className="h-12 w-12 text-amber-400 mx-auto mb-3" />
            <p className="text-muted-foreground mb-6">
              {lastCalculatedResult.errorMessage || 'Complete all semester details to see your CGPA'}
            </p>
            <Button
              onClick={calculate}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If calculated and valid, show the result
  const performanceMessage = getPerformanceMessage(lastCalculatedResult.ggpa);
  const formattedGgpa = formatGgpa(lastCalculatedResult.ggpa);

  return (
    <Card className="border-teal-300 bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 shadow-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Award className="h-7 w-7 text-teal-600" />
          Your CGPA
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="py-6">
          <div className="text-6xl font-bold text-teal-700 mb-2">{formattedGgpa}</div>
          <div className="text-2xl font-semibold text-teal-600">{performanceMessage}</div>
        </div>
        
        <div className="pt-4 border-t border-teal-200">
          <p className="text-sm text-muted-foreground mb-4">
            Based on {semesters.length} semester
            {semesters.length !== 1 ? 's' : ''}
          </p>
          <Button
            onClick={calculate}
            variant="outline"
            size="sm"
            className="border-teal-300 text-teal-700 hover:bg-teal-50"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Recalculate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
