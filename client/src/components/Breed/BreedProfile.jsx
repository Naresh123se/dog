import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";


const BreedProfile = ({ breed, onClose }) => {
  return (
    <Dialog open={!!breed} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden rounded-lg">
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="relative">
            <img
              src={breed?.image}
              alt={breed?.name}
              className="w-full h-64 object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-white">
                  {breed?.name}
                </DialogTitle>
                <DialogDescription className="text-white/90 flex gap-2 items-center mt-1">
                  <span>{breed?.origin}</span>
                  <span>•</span>
                  <span>{breed?.lifespan}</span>
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{breed?.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Temperament:
                      </span>
                      <span className="font-medium text-right">
                        {breed?.temperament}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Energy Level:
                      </span>
                      <span className="font-medium">{breed?.energyLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Hypoallergenic:
                      </span>
                      <span className="font-medium">
                        {breed?.hypoallergenic ? "Yes" : "No"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Care Needs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Grooming:</span>
                      <span className="font-medium">{breed?.grooming}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Exercise:</span>
                      <span className="font-medium">{breed?.exercise}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Diet:</span>
                      <span className="font-medium">{breed?.diet}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Health Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {breed?.healthIssues}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BreedProfile;
