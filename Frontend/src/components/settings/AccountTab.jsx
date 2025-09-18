import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Eye, EyeOff, Shield } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import useAuthStore from "@/store/useAuthStore"

const AccountTab = ()=> {
  const { user,loading,updatePassword,updateEmail } = useAuthStore();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [newEmail, setNewEmail] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [passwordErrors, setPasswordErrors] = useState({})

  const handlePasswordChange = (e) => {
    const { id, value } = e.target
    setPasswordData(prev => ({ ...prev, [id]: value }))
    
    // Clear errors when user types
    if (passwordErrors[id]) {
      setPasswordErrors(prev => ({ ...prev, [id]: "" }))
    }
  }

  const handleEmailChange = (e) =>{
    setNewEmail(e.target.value)
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const validatePasswordForm = () => {
    const errors = {}
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required"
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required"
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters"
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }
    
    setPasswordErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleEmailSubmit = async(e) => {
    e.preventDefault();
    if(user.email===newEmail){
      alert('Email is Same');
      return;
    }
    const result = await updateEmail(newEmail);
    if(result){
      setNewEmail('');
    }
  }

  const handlePasswordSubmit = async(e) => {
    e.preventDefault()
    
    if (!validatePasswordForm()) return
    const result = await updatePassword({currentPassword:passwordData.currentPassword,newPassword:passwordData.newPassword});
    if(result){
      setPasswordData({currentPassword: "",newPassword: "",confirmPassword: ""});
    }
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deletion requested")
    }
  }

  return (
    <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Change Email</CardTitle>
            <CardDescription>Update your account email</CardDescription>
          </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentEmail">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentEmail"
                  type='text'
                  value={user.email}
                  disbaled={true}
                  className={passwordErrors.currentPassword ? "border-destructive" : ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newEmail">New Email</Label>
              <div className="relative">
                <Input
                  id="newEmail"
                  type={'text'}
                  value={newEmail}
                  onChange={handleEmailChange}
                  // className={ ? "border-destructive" : ""}
                />
              </div>
              {passwordErrors.newPassword && (
                <p className="text-sm text-destructive">{passwordErrors.newPassword}</p>
              )}
            </div>

            <Button type="submit" className={'cursor-pointer'}>
              {loading?'Updating...':"Update Email"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={passwordErrors.currentPassword ? "border-destructive" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-sm text-destructive">{passwordErrors.currentPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={passwordErrors.newPassword ? "border-destructive" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordErrors.newPassword && (
                <p className="text-sm text-destructive">{passwordErrors.newPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={passwordErrors.confirmPassword ? "border-destructive" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="text-sm text-destructive">{passwordErrors.confirmPassword}</p>
              )}
            </div>

            <Button type="submit" className={'cursor-pointer'}>
              {"Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-medium">Delete Account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              className="md:ml-4 cursor-pointer"
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountTab;