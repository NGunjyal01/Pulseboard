import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { themes1 } from "@/utils/constants"

const accentColors = themes1

const PreferencesTab = ({ preferences, setPreferences, theme, setTheme, onSave }) => {
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
            <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-32">
                <SelectValue />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
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
                    className={`w-12 h-12 rounded-lg ${color.color} ${
                    preferences.accentColor === color.name
                        ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600"
                        : ""
                    }`}
                    onClick={() => setPreferences((prev) => ({ ...prev, accentColor: color.value }))}
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

        <div className="flex justify-end">
        <Button onClick={onSave}>Save Preferences</Button>
        </div>
    </div>
    )
}

export default PreferencesTab;