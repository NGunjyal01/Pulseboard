"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Palette, Shield, User } from "lucide-react"
import ProfileTab from "@/components/settings/ProfileTab"
import PreferencesTab from "@/components/settings/PreferencesTab"
import AccountTab from "@/components/settings/AccountTab"
import { useNavigate } from "react-router"

const Settings = () => {
    const [preferences, setPreferences] = useState({
    notifications: true,
    tooltips: true,
    accentColor: "blue",
    })
    const navigate = useNavigate();
    const handleSavePreferences = () => {
    console.log("Preferences saved:", preferences)
    }

    return (
    <div className="min-h-screen bg-background">
        <header className="border-b">
            <div className="flex h-16 items-center px-6">
                <Button variant="ghost" size="sm" onClick={() => navigate("/dashboards")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboards
                </Button>
                <div className="flex-1 text-center">
                    <h1 className="text-lg font-semibold">Settings</h1>
                </div>
            </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile" className={'cursor-pointer'}>
                        <User className="h-4 w-4 mr-2" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className={'cursor-pointer'}>
                        <Palette className="h-4 w-4 mr-2" />
                        Preferences
                    </TabsTrigger>
                    <TabsTrigger value="account" className={'cursor-pointer'}>
                        <Shield className="h-4 w-4 mr-2" />
                        Account
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileTab/>
                </TabsContent>

                <TabsContent value="preferences">
                    <PreferencesTab/>
                </TabsContent>

                <TabsContent value="account">
                    <AccountTab />
                </TabsContent>
            </Tabs>
        </div>
    </div>
    )
}

export default Settings;