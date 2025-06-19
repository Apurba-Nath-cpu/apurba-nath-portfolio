import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const toName = import.meta.env.VITE_TO_NAME;
  const phone = import.meta.env.VITE_PHONE_NUMBER;

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      from_name: formData.name,
      to_name: toName,
      email: formData.email,
      message: formData.message,
    };

    console.log(formData.email);
    console.log(formData.name);
    
    await emailjs
    .send(serviceId, templateId, templateParams, {
      publicKey: publicKey,
    })
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      },
      (err) => {
        console.log('FAILED...', err);
        toast({
          title: "Something went wrong!",
          description: err,
        });
      },
    );
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-secondary/50 dark:bg-gray-900">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">Get In Touch</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            I'm currently open to new opportunities. Whether you have a question or just want to say hi, 
            I'll get back to you as soon as possible!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="card-hover animate-fade-in-left">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Email</h3>
              <a href="mailto:apurba64880@gmail.com" className="text-accent hover:underline">
                apurba64880@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card className="card-hover animate-fade-in">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Phone</h3>
              <a href={`tel:+91 8690585483${phone}`} className="text-accent hover:underline">
                +91 8690585483{phone}
              </a>
            </CardContent>
          </Card>

          <Card className="card-hover animate-fade-in-right">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Location</h3>
              <p className="text-muted-foreground">
                Indiranagar, Bengaluru, Karnataka
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12 animate-scale-in">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="h-4 w-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
