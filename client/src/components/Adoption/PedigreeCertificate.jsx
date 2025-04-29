import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PedigreeCertificate({ dog }) {
  const [open, setOpen] = useState(false);

  if (!dog) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-100" size="sm">
          View Pedigree
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[50vw] max-h-[90vh] overflow-hidden">
        <ScrollArea className="h-[80vh] w-full pr-4">
          <div className="w-full max-w-5xl bg-blue-50 p-6 rounded-lg shadow-lg border-4 border-[#1DADC9]/30">
            {/* Header section */}
            <div className="flex items-center gap-4 mb-6 pb-2 border-b border-blue-200">
              <div className="flex-shrink-0 w-16 h-16 bg-[#1DADC9]/20 rounded-full flex items-center justify-center text-blue-400 relative">
                <Shield size={40} />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#1DADC9]">
                  PET
                </div>
              </div>
              <div className="flex-grow">
                <h1 className="text-3xl font-bold text-blue-900">
                  International Kennel Club
                </h1>
                <p className="text-lg text-blue-800 uppercase tracking-wider">
                  EXPORT PEDIGREE
                </p>
              </div>
              <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
              </div>
            </div>

            {/* Main content - Same as before */}
            <div className="flex gap-6">
              {/* Left side - Dog info */}
              <div className="w-1/4 flex-shrink-0">
                <table className="w-full text-sm border border-blue-200">
                  <tbody>
                    <tr className="bg-blue-200">
                      <td className="font-bold p-1">OWNER</td>
                      <td className="p-1">{dog.ownerName || "N/A"}</td>
                    </tr>
                    <tr>
                      <td className="font-bold p-1">ADDRESS</td>
                      <td className="p-1">{dog.ownerAddress || "N/A"}</td>
                    </tr>
                    <tr className="bg-blue-200">
                      <td className="font-bold p-1">REG. DATE</td>
                      <td className="p-1">
                        {dog.regDate
                          ? new Date(dog.regDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold p-1">REG. NR.</td>
                      <td className="p-1">{dog.regNumber || "N/A"}</td>
                    </tr>
                    <tr className="bg-blue-200">
                      <td className="font-bold p-1">BREED</td>
                      <td className="p-1">{dog.breed || "N/A"}</td>
                    </tr>
                    <tr>
                      <td className="font-bold p-1">DOG NAME</td>
                      <td className="p-1">{dog.name || "N/A"}</td>
                    </tr>
                    <tr className="bg-blue-200">
                      <td className="font-bold p-1">MICROCHIP</td>
                      <td className="p-1">{dog.microchip || "N/A"}</td>
                    </tr>
                    <tr>
                      <td className="font-bold p-1">D.O.B.</td>
                      <td className="p-1">
                        {dog.dob
                          ? new Date(dog.dob).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                    <tr className="bg-blue-200">
                      <td className="font-bold p-1">SEX</td>
                      <td className="p-1">{dog.gender || "N/A"}</td>
                    </tr>
                    <tr>
                      <td className="font-bold p-1">COLOR</td>
                      <td className="p-1">{dog.color || "N/A"}</td>
                    </tr>
                    <tr className="bg-blue-200">
                      <td className="font-bold p-1">BREEDER</td>
                      <td className="p-1">
                        {dog.breederName?.name || dog.breeder || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Right side - Pedigree tree */}
              <div className="flex-grow relative">
                {/* Watermark */}
                <div className="absolute inset-1 flex mt-10 justify-center opacity-10 pointer-events-none">
                  <div className="text-7xl font-bold text-blue-900 ">PETS</div>
                </div>

                {/* Pedigree family tree */}
                <div className="relative z-10 border border-2 p-2 border-blue-200">
                  <div className="flex items-center mb-6">
                    <div className="w-1/4 p-2 border border-blue-300 bg-blue-100 rounded text-sm">
                      <p className="font-bold">SIRE</p>
                      <p>{dog.sireName || "N/A"}</p>
                      <p>{dog.sireRegNumber || "N/A"}</p>
                      <p>{dog.sireColor || "N/A"}</p>
                    </div>
                    <div className="flex-grow pl-4">
                      <div className="border-t-2 border-l-2 border-blue-400 h-32 relative">
                        <div className="absolute top-0 -right-2 w-1/2">
                          <div className="p-2 border border-blue-300 bg-blue-100 rounded text-xs mb-2">
                            <p>{dog.sireGrandfather || "N/A"}</p>
                            <p>{dog.sireGrandfatherReg || "N/A"}</p>
                          </div>
                          <div className="p-2 border border-blue-300 bg-blue-100 rounded text-xs">
                            <p>{dog.sireGrandmother || "N/A"}</p>
                            <p>{dog.sireGrandmotherReg || "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 border border-blue-300 bg-blue-100 rounded text-sm mx-auto w-1/3 mb-6">
                    <p className="font-bold">{dog.name || "N/A"}</p>
                    <p>{dog.regNumber || "N/A"}</p>
                    <p>{dog.color || "N/A"}</p>
                    <p>
                      {dog.dob ? new Date(dog.dob).toLocaleDateString() : "N/A"}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div className="w-1/4 p-2 border border-blue-300 bg-blue-100 rounded text-sm">
                      <p className="font-bold">DAM</p>
                      <p>{dog.damName || "N/A"}</p>
                      <p>{dog.damRegNumber || "N/A"}</p>
                      <p>{dog.damColor || "N/A"}</p>
                    </div>
                    <div className="flex-grow pl-4">
                      <div className="border-t-2 border-l-2 border-blue-400 h-32 relative">
                        <div className="absolute top-0 -right-2 w-1/2">
                          <div className="p-2 border border-blue-300 bg-blue-100 rounded text-xs mb-2">
                            <p>{dog.damGrandfather || "N/A"}</p>
                            <p>{dog.damGrandfatherReg || "N/A"}</p>
                            <p>{dog.damGrandfatherColor || "N/A"}</p>
                          </div>
                          <div className="p-2 border border-blue-300 bg-blue-100 rounded text-xs">
                            <p>{dog.damGrandmother || "N/A"}</p>
                            <p>{dog.damGrandmotherReg || "N/A"}</p>
                            <p>{dog.damGrandmotherColor || "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="font-bold text-blue-900">President IKC WORLD</p>
                <p className="italic text-blue-700 font-serif">Fred Collins</p>
              </div>
              <div className="text-xs text-blue-700">
                <p>
                  Pets is  recognized all over the World
                </p>
                <p>www.petsExample.org</p>
                <p>Pets</p>
              </div>
              <div className="w-16 h-16 bg-gray-200"></div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
