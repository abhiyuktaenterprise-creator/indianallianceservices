import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ContactForm from "./ContactForm";

interface EnquiryModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultRole?: string;
}

export default function EnquiryModal({
  isOpen,
  onOpenChange,
  defaultRole = "",
}: EnquiryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-heading font-bold text-foreground">
            Get Career Counselling
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill in your basic details and an Airport Career Services (ACS) advisor will connect with you to evaluate your profile.
          </DialogDescription>
        </DialogHeader>

        <ContactForm
          defaultRole={defaultRole}
          showTitle={false}
          className="border-none shadow-none p-0"
          onSuccess={() => {
            setTimeout(() => onOpenChange(false), 2000);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
