import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, X } from "lucide-react"
import useAuthStore from "@/store/useAuthStore"
import { useState } from "react"

const ProfileTab = () => {
    const { user, updateProfile, loading } = useAuthStore();
    const { imageUrl, firstName: initialFirstName, lastName: initialLastName, email: initialEmail } = user;
    
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [newImage, setNewImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(imageUrl);
    
    const hasChanges = (firstName !== initialFirstName || lastName !== initialLastName  || newImage !== null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert("File size must be less than 2MB");
                return;
            }
            
            // Check file type
            if (!file.type.match('image/(jpeg|png|gif)')) {
                alert("Only JPG, PNG or GIF files are allowed");
                return;
            }
            
            setNewImage(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSave = async () => {
        const formData = new FormData();

        if (firstName !== initialFirstName) formData.append("firstName", firstName);
        if (lastName !== initialLastName) formData.append("lastName", lastName);
        if (newImage) formData.append("imageUrl", newImage);

        const result = await updateProfile(formData); // pass FormData, not plain object
        if(result){
            setNewImage(null);
        }
    };

    const onCancel = () => {
        setFirstName(initialFirstName);
        setLastName(initialLastName);
        setNewImage(null);
        setImagePreview(imageUrl);
    };

    const removeImage = () => {
        setNewImage(null);
        setImagePreview(imageUrl);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={imagePreview} alt="Profile" />
                            <AvatarFallback>{initialFirstName[0] + initialLastName[0]}</AvatarFallback>
                        </Avatar>
                        {newImage && (
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full cursor-pointer"
                                disabled={loading}
                                onClick={removeImage}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="file-upload" className="cursor-pointer">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="cursor-pointer"
                                asChild
                            >
                                <div>
                                    <Upload className="h-4 w-4 mr-2" />
                                    {newImage ? "Change Photo" : "Upload Photo"}
                                </div>
                            </Button>
                        </Label>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/jpeg,image/png,image/gif"
                            className="hidden"
                            disabled={loading}
                        />
                        <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                {hasChanges && (
                    <div className="flex justify-end gap-4">
                        {!loading && <Button variant="destructive" className="cursor-pointer"  onClick={onCancel}>
                            Cancel
                        </Button>}
                        <Button 
                            className="cursor-pointer" 
                            onClick={onSave}
                            disabled={loading}
                        >
                            {loading?'Saving...':'Save Changes'}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default ProfileTab;