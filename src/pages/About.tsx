
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Team members data
const teamMembers = [
  {
    name: "Kevin Desai",
    role: "Project Lead & Backend Developer",
    bio: "Kevin leads the development of Surat Crime Connect, focusing on system architecture and backend services.",
    image: "",
    initials: "KD"
  },
  {
    name: "Aditya Diwan",
    role: "Frontend Developer",
    bio: "Aditya is responsible for creating the user interface and ensuring a great user experience across all devices.",
    image: "",
    initials: "AD"
  },
  {
    name: "Jay Panchal",
    role: "Data Analyst & API Integration",
    bio: "Jay handles data processing and integration with various crime data sources and APIs.",
    image: "",
    initials: "JP"
  },
  {
    name: "Harry Mehta",
    role: "Community Manager & Content Lead",
    bio: "Harry manages the community section and oversees all content published on the platform.",
    image: "",
    initials: "HM"
  }
];

const About = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">About Surat Crime Connect</h1>
          <p className="text-lg text-muted-foreground">
            Empowering the citizens of Surat with reliable crime information, 
            community-driven safety initiatives, and a platform to connect and share.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              Surat Crime Connect was created with a simple but powerful mission: to make Surat
              a safer place through information sharing, community engagement, and increased awareness.
            </p>
            <p className="mb-4">
              We believe that when citizens are well-informed about crime incidents and safety concerns
              in their neighborhoods, they can take better precautions and make safer decisions.
            </p>
            <p>
              Our platform brings together official crime reports, community observations, and
              safety resources in one place, making it easier for residents to stay informed and connected.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Why We Started</h2>
            <p className="mb-4">
              The idea for Surat Crime Connect came from our own experiences as residents of Surat.
              We noticed that crime information was scattered across different sources, making it
              difficult for citizens to get a complete picture of safety in their areas.
            </p>
            <p className="mb-4">
              We also saw the power of community in addressing local safety issues - when neighbors
              share information and work together, they create stronger, safer neighborhoods.
            </p>
            <p>
              By bringing together technology and community, we've created a platform that helps
              everyone contribute to making Surat safer.
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center">
              <CardHeader className="pt-6">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className="text-xl bg-police text-white">{member.initials}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Twitter className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-muted rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Our Location</h3>
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-police mt-0.5" />
                <p>
                  Surat Crime Connect<br />
                  123 City Light Road<br />
                  Surat, Gujarat 395007<br />
                  India
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-police" />
                  <p>info@suratcrimeconnect.com</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-police" />
                  <p>+91 98765 43210</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Office Hours</h3>
              <p>Monday - Friday: 9am - 6pm</p>
              <p>Saturday: 10am - 4pm</p>
              <p>Sunday: Closed</p>
              <p className="mt-2 text-sm">(Emergency reports are monitored 24/7)</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
          <p className="max-w-2xl mx-auto mb-6">
            We're always looking for passionate individuals who want to contribute to making
            Surat safer. Whether you have technical skills, content creation abilities, or simply
            a desire to help, there's a place for you in our community.
          </p>
          <Button>Get Involved</Button>
        </div>
      </div>
    </Layout>
  );
};

export default About;
