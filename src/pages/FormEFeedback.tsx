import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MessageSquare, Star, ArrowLeft, Send } from "lucide-react";
import { z } from "zod";

const feedbackSchema = z.object({
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  what_liked: z.string().min(1, "Please tell us what you liked").max(2000, "Must be under 2000 characters"),
  what_not_liked: z.string().min(1, "Please tell us what you didn't like or understand").max(2000, "Must be under 2000 characters"),
  what_could_improve: z.string().min(1, "Please share what could be improved").max(2000, "Must be under 2000 characters"),
  overall_rating: z.number().min(1, "Please provide a rating").max(5),
  additional_comments: z.string().max(2000, "Must be under 2000 characters").optional(),
});

const FormEFeedback = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const [formData, setFormData] = useState({
    email: "",
    what_liked: "",
    what_not_liked: "",
    what_could_improve: "",
    overall_rating: 0,
    additional_comments: "",
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = feedbackSchema.parse({
        ...formData,
        overall_rating: formData.overall_rating || undefined,
        email: formData.email || undefined,
      });

      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("form_e_feedback")
        .insert({
          email: validated.email || null,
          what_liked: validated.what_liked || null,
          what_not_liked: validated.what_not_liked || null,
          what_could_improve: validated.what_could_improve || null,
          overall_rating: validated.overall_rating || null,
          additional_comments: validated.additional_comments || null,
        });

      if (error) throw error;

      setSubmitted(true);
      toast.success("Thank you for your feedback!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issues = error.issues;
        toast.error(issues[0]?.message || "Validation error");
      } else {
        console.error("Error submitting feedback:", error);
        toast.error("Failed to submit feedback. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
            <p className="text-muted-foreground mb-6">
              Your feedback has been submitted successfully. We appreciate you taking the time to help us improve the Form E Calculator.
            </p>
            <Button onClick={() => navigate("/services")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/services")} 
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Button>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Form E Calculator Feedback</h1>
              <p className="text-muted-foreground">Help us improve your experience</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address (optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                If you'd like us to follow up with you
              </p>
            </div>

            {/* Overall Rating */}
            <div>
            <label className="block text-sm font-medium mb-2">
              Overall Rating <span className="text-destructive">*</span>
            </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleInputChange("overall_rating", rating)}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-2 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        rating <= (hoveredRating || formData.overall_rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* What did you like? */}
            <div>
            <label className="block text-sm font-medium mb-2">
              What did you like about the Form E Calculator? <span className="text-destructive">*</span>
            </label>
              <textarea
                value={formData.what_liked}
                onChange={(e) => handleInputChange("what_liked", e.target.value)}
                placeholder="Tell us what worked well for you..."
                rows={3}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* What didn't you like / understand? */}
            <div>
            <label className="block text-sm font-medium mb-2">
              What didn't you like or understand? <span className="text-destructive">*</span>
            </label>
              <textarea
                value={formData.what_not_liked}
                onChange={(e) => handleInputChange("what_not_liked", e.target.value)}
                placeholder="Tell us about any confusing or frustrating parts..."
                rows={3}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* What could be improved? */}
            <div>
            <label className="block text-sm font-medium mb-2">
              What could be improved? <span className="text-destructive">*</span>
            </label>
              <textarea
                value={formData.what_could_improve}
                onChange={(e) => handleInputChange("what_could_improve", e.target.value)}
                placeholder="Share your suggestions for making this better..."
                rows={3}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* Additional Comments */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Any other comments?
              </label>
              <textarea
                value={formData.additional_comments}
                onChange={(e) => handleInputChange("additional_comments", e.target.value)}
                placeholder="Anything else you'd like to share..."
                rows={3}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full gap-2" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEFeedback;