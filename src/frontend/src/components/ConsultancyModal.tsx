import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarHeart, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

interface ConsultancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCondition?: string;
}

const CONDITIONS = [
  "PCOS",
  "Diabetes",
  "Cardiovascular Disease",
  "Weight Loss",
  "Weight Gain",
  "Other",
];

export function ConsultancyModal({
  isOpen,
  onClose,
  defaultCondition,
}: ConsultancyModalProps) {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [condition, setCondition] = useState(defaultCondition ?? "");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required.";
    if (!email.trim()) errs.email = "Email address is required.";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email))
      errs.email = "Please enter a valid email.";
    if (!condition) errs.condition = "Please select a health condition.";
    if (!message.trim()) errs.message = "Please share your health goals.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      await (actor as any).submitConsultancyRequest(
        name,
        email,
        condition,
        message,
        new Date().toISOString(),
      );
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after close animation
    setTimeout(() => {
      setName("");
      setEmail("");
      setCondition(defaultCondition ?? "");
      setMessage("");
      setErrors({});
      setIsSuccess(false);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent data-ocid="consultancy.dialog" className="max-w-lg w-full">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DDEFE6] flex items-center justify-center">
              <CalendarHeart className="w-5 h-5 text-[#1F5B57]" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-[#111111]">
                Book a Nutrition Consultation
              </DialogTitle>
              <DialogDescription className="text-sm text-[#4B5560]">
                Get a personalized plan crafted by our expert nutritionists.
              </DialogDescription>
            </div>
          </div>
          <p className="text-xs text-[#1F5B57] bg-[#DDEFE6] rounded-lg px-3 py-2 font-medium">
            ✅ Free initial consultation. No commitment required.
          </p>
        </DialogHeader>

        {isSuccess ? (
          <div
            data-ocid="consultancy.success_state"
            className="py-8 flex flex-col items-center gap-4 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#DDEFE6] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#1F5B57]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#111111] text-base mb-1">
                Request Submitted!
              </h3>
              <p className="text-sm text-[#4B5560] max-w-xs">
                Your consultation request has been submitted! Our team will
                reach out within 24–48 hours.
              </p>
            </div>
            <Button
              data-ocid="consultancy.close_button"
              onClick={handleClose}
              className="bg-[#1F5B57] hover:bg-[#174843] text-white"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="consult-name"
                className="text-sm font-medium text-[#111111]"
              >
                Full Name
              </Label>
              <Input
                id="consult-name"
                data-ocid="consultancy.input"
                placeholder="e.g. Ayesha Khan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-400" : ""}
              />
              {errors.name && (
                <p
                  data-ocid="consultancy.name_error"
                  className="text-xs text-red-500"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="consult-email"
                className="text-sm font-medium text-[#111111]"
              >
                Email Address
              </Label>
              <Input
                id="consult-email"
                data-ocid="consultancy.input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-400" : ""}
              />
              {errors.email && (
                <p
                  data-ocid="consultancy.email_error"
                  className="text-xs text-red-500"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#111111]">
                Health Condition
              </Label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger
                  data-ocid="consultancy.select"
                  className={errors.condition ? "border-red-400" : ""}
                >
                  <SelectValue placeholder="Select your condition" />
                </SelectTrigger>
                <SelectContent>
                  {CONDITIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.condition && (
                <p
                  data-ocid="consultancy.condition_error"
                  className="text-xs text-red-500"
                >
                  {errors.condition}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="consult-message"
                className="text-sm font-medium text-[#111111]"
              >
                Your Goals / Message
              </Label>
              <Textarea
                id="consult-message"
                data-ocid="consultancy.textarea"
                placeholder="Tell us about your health goals and any specific concerns..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={errors.message ? "border-red-400" : ""}
              />
              {errors.message && (
                <p
                  data-ocid="consultancy.message_error"
                  className="text-xs text-red-500"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                data-ocid="consultancy.cancel_button"
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                data-ocid="consultancy.submit_button"
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#1F5B57] hover:bg-[#174843] text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Consultation"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
