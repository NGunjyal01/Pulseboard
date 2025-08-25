import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { themes1 } from "@/utils/constants"
import { useThemeStore } from "@/store/useThemeStore"
import { useState } from "react"


const PreferencesTab = () => {

    const {mode:initialMode,theme:initialTheme,toggleMode,setTheme:setNewTheme} = useThemeStore();
    const [mode,setMode] = useState(initialMode);
    const [theme,setTheme] = useState(initialTheme);
    console.log(mode)
    const accentColors = themes1[mode];
    const [preferences, setPreferences] = useState({
        notifications: true,
        tooltips: true,
    })
    const hasChanges = (initialMode!==mode) || (initialTheme!==theme);
    const handleSavePreferences = () => {
        console.log("Preferences saved:", preferences)
    }
    const onSave = ()=>{
        if(initialMode!==mode){
            toggleMode();
        }
        if(initialTheme!==theme){
            console.log(theme)
            setNewTheme(theme);
        }
        console.log("save")
    }
    return (
    <div className="space-y-6">
        <Card>
        <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how Pulseboard looks and feels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
            <div>
                <Label className="text-base">Theme Mode</Label>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
            </div>
            <Select value={mode} onValueChange={setMode}>
                <SelectTrigger className="w-32 cursor-pointer">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem className={'cursor-pointer'} value="light">Light</SelectItem>
                    <SelectItem className={'cursor-pointer'} value="dark">Dark</SelectItem>
                </SelectContent>
            </Select>
            </div>

            <div>
            <Label className="text-base">Accent Color</Label>
            <p className="text-sm text-muted-foreground mb-4">Choose your preferred accent color</p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {accentColors.map((color) => (
                <button
                    key={color.name}
                    className={`w-12 h-12 rounded-lg ${color.color} cursor-pointer ${
                    theme === color.name
                        ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600"
                        : ""
                    }`}
                    onClick={() => setTheme(color.name)}
                    title={color.name}
                />
                ))}
            </div>
            </div>
        </CardContent>
        </Card>

        <Card>
        <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
            <div>
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about dashboard updates</p>
            </div>
            <Switch
                checked={preferences.notifications}
                onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, notifications: checked }))}
            />
            </div>

            <div className="flex items-center justify-between">
            <div>
                <Label className="text-base">Show Tooltips</Label>
                <p className="text-sm text-muted-foreground">Display helpful tooltips throughout the app</p>
            </div>
            <Switch
                checked={preferences.tooltips}
                onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, tooltips: checked }))}
            />
            </div>
        </CardContent>
        </Card>

        {hasChanges && <div className="flex justify-end">
            <Button onClick={onSave} className={'cursor-pointer'}>Save Preferences</Button>
        </div>}
    </div>
    )
}

export default PreferencesTab;