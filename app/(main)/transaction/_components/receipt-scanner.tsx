"use client";

import { scanReceipt } from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { ScannedReceipt } from "@/types";
import { Camera, Loader2 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

interface ReceiptScannerProps {
  onScanComplete: (data: ScannedReceipt) => void;
}

const ReceiptScanner = ({ onScanComplete }: ReceiptScannerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async (file: File) => {
    if(file.size > 5 * 1024 * 1024){
      toast.error("File size should be less than 5MB.");
      return;
    }
    await scanReceiptFn(file);
  };

  useEffect(() =>{
    if(scannedData && !scanReceiptLoading) {
      setTimeout(() => {
      onScanComplete(scannedData);
      toast.success("Receipt scanned successfully");
    }, 0);
    }
  }, [scanReceiptLoading, scannedData]);
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        className=" w-full h-10 bg-linear-to-br from-orange-500 via-pink-500 
      to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white
      hover:text-white cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
      >
        {scanReceiptLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Scanning Receipt...</span>
          </>
        ) : (
          <>
            {" "}
            <Camera className="mr-2" />
            <span>Scan Receipt with AI</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default ReceiptScanner;
