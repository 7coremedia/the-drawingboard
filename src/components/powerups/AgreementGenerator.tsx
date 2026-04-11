import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileSignature, Eye, Download, X } from 'lucide-react';
import { OnboardingResponse } from '@/types/supabase';
import { toast } from '@/hooks/use-toast';
import BlocksEditor, { BlocksData } from '@/components/editor/BlocksEditor';
import { supabase } from '@/integrations/supabase/client';

interface AgreementGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  brandData: OnboardingResponse;
}

const AgreementGenerator = ({ isOpen, onClose, brandData }: AgreementGeneratorProps) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [agreementType, setAgreementType] = useState('Brand Architecture Retainer');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [fee, setFee] = useState('');
  
  const [generatedBlocks, setGeneratedBlocks] = useState<BlocksData | null>(null);

  const generateAgreementPreview = async () => {
    // Basic template blocks generation
    const blocks: BlocksData = {
      id: crypto.randomUUID(),
      blocks: [
        {
          id: crypto.randomUUID(),
          type: 'header',
          content: { text: "MASTER SERVICES AGREEMENT", level: 1 }
        },
        {
          id: crypto.randomUUID(),
          type: 'paragraph',
          content: { 
            text: `This Master Services Agreement (the "Agreement") is entered into as of **${effectiveDate}** (the "Effective Date") by and between **KŌDĒ** ("Studio") and **${brandData.brand_name || brandData.sender_name || 'Client'}** ("Client").` 
          }
        },
        {
          id: crypto.randomUUID(),
          type: 'header',
          content: { text: "1. Scope of Services", level: 3 }
        },
        {
          id: crypto.randomUUID(),
          type: 'paragraph',
          content: { text: `The Studio agrees to provide the following services: **${agreementType}**, according to the specifications set forth in the finalized Proposal.` }
        },
        {
          id: crypto.randomUUID(),
          type: 'header',
          content: { text: "2. Compensation", level: 3 }
        },
        {
          id: crypto.randomUUID(),
          type: 'paragraph',
          content: { text: `For the services rendered, the Client shall pay the Studio the sum of **${fee || 'TBD'}** as per the payment schedule: 50% non-refundable deposit to commence work, and 50% prior to final asset handover.` }
        },
        {
          id: crypto.randomUUID(),
          type: 'header',
          content: { text: "3. Ownership & Intellectual Property", level: 3 }
        },
        {
          id: crypto.randomUUID(),
          type: 'paragraph',
          content: { text: `Upon receipt of full payment, the Studio grants the Client all rights, title, and interest in the final approved deliverables. The Studio retains the right to display the work in its portfolio.` }
        },
        {
          id: crypto.randomUUID(),
          type: 'header',
          content: { text: "4. Confidentiality", level: 3 }
        },
        {
          id: crypto.randomUUID(),
          type: 'paragraph',
          content: { text: `Both parties agree to keep all proprietary information, trade secrets, and strategic frameworks completely confidential and exclusively for the mutual benefit of this project.` }
        },
        {
          id: crypto.randomUUID(),
          type: 'header',
          content: { text: "5. Signatures", level: 3 }
        },
        {
          id: crypto.randomUUID(),
          type: 'paragraph',
          content: { text: `_____________________________________\nFor KŌDĒ Studio\n\n_____________________________________\nFor ${brandData.brand_name || brandData.sender_name}` }
        }
      ]
    };
    
    setGeneratedBlocks(blocks);
    setPreviewMode(true);
  };

  const downloadAgreement = () => {
    toast({
      title: 'Agreement Generated!',
      description: 'The agreement has been generated and is ready to be sent.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSignature className="h-6 w-6 text-[#C94A2C]" />
            Generate Service Agreement
          </DialogTitle>
          <DialogDescription>
            Create a binding Master Services Agreement for {brandData.brand_name}.
          </DialogDescription>
        </DialogHeader>

        {!previewMode ? (
          <div className="space-y-6 pt-4">
            <Card className="border-black/5 shadow-sm">
               <CardHeader>
                 <CardTitle className="text-lg">Agreement Parameters</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="agreementType">Service Type</Label>
                    <Select value={agreementType} onValueChange={setAgreementType}>
                      <SelectTrigger className="border-black/10">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Brand Architecture & Identity">Full Brand Architecture</SelectItem>
                        <SelectItem value="Brand Refresh & Rebrand">Brand Refresh</SelectItem>
                        <SelectItem value="Digital Brand System">Digital Brand System</SelectItem>
                        <SelectItem value="Strategic Brand Consulting Retainer">Consulting Retainer</SelectItem>
                        <SelectItem value="IP Product: Personal Brand Launcher">Personal Brand Launcher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <Label htmlFor="effectiveDate">Effective Date</Label>
                       <Input id="effectiveDate" type="date" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} className="border-black/10" />
                     </div>
                     <div>
                       <Label htmlFor="fee">Contract Fee (Optional)</Label>
                       <Input id="fee" placeholder="e.g. ₦3,500,000" value={fee} onChange={e => setFee(e.target.value)} className="border-black/10" />
                     </div>
                  </div>
               </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Agreement Preview</h3>
              <Button variant="outline" onClick={() => setPreviewMode(false)} className="rounded-full">
                <X className="h-4 w-4 mr-2" /> Edit Info
              </Button>
            </div>
            {generatedBlocks && (
              <BlocksEditor
                initialData={generatedBlocks}
                title={`Agreement — ${brandData.brand_name || ''}`}
                singlePageDefault={true}
                storageKey=""
                onChange={async () => {}}
              />
            )}
          </div>
        )}
        
        <div className="flex justify-end gap-2 pt-4 border-t border-black/5">
          <Button variant="outline" onClick={onClose} className="rounded-full">Cancel</Button>
          {!previewMode ? (
            <Button onClick={generateAgreementPreview} className="rounded-full bg-[#0D0D0D] text-white hover:bg-[#C94A2C] uppercase text-[10px] font-bold tracking-widest px-6">
              <Eye className="h-4 w-4 mr-2" /> Generate Contract
            </Button>
          ) : (
            <Button onClick={downloadAgreement} className="rounded-full bg-black text-white hover:bg-[#C94A2C]">
              <Download className="h-4 w-4 mr-2" /> Download Document
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgreementGenerator;
