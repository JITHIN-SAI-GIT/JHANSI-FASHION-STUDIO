import React, { useState, useEffect } from 'react';
import { settingsService } from '../services/api';
import { Save, Image as ImageIcon, Film, FileText, Globe, Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const WebsiteSettings = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [heroImage, setHeroImage] = useState(null);
    const [heroVideo, setHeroVideo] = useState(null);
    const [removeHeroImage, setRemoveHeroImage] = useState(false);
    const [removeHeroVideo, setRemoveHeroVideo] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await settingsService.get();
            setSettings(data);
        } catch (error) {
            toast.error('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('aboutText', settings.aboutText);
            formData.append('contactInfo', JSON.stringify(settings.contactInfo));
            formData.append('removeHeroImage', removeHeroImage);
            formData.append('removeHeroVideo', removeHeroVideo);

            if (heroImage) formData.append('heroImage', heroImage);
            if (heroVideo) formData.append('heroVideo', heroVideo);

            const { data } = await settingsService.update(formData);
            setSettings(data);
            setHeroImage(null);
            setHeroVideo(null);
            setRemoveHeroImage(false);
            setRemoveHeroVideo(false);
            toast.success('Settings updated successfully!');
        } catch (error) {
            toast.error('Failed to update settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="p-12 flex justify-center">
            <Loader2 className="animate-spin text-amber-500" size={40} />
        </div>
    );

    return (
        <form onSubmit={handleSave} className="space-y-8 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Hero Section */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Globe className="text-amber-500" size={20} />
                        Hero Section
                    </h3>

                    <div className="space-y-4">
                        <div className="p-4 bg-black/50 rounded-xl border border-neutral-700">
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-neutral-400">Homepage Hero Image</label>
                                {(heroImage || (settings.heroImage?.url && !removeHeroImage)) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setHeroImage(null);
                                            if (settings.heroImage?.url) setRemoveHeroImage(true);
                                        }}
                                        className="text-red-500 hover:text-red-400 p-1 transition-colors"
                                        title="Remove Image"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                            {(heroImage || (settings.heroImage?.url && !removeHeroImage)) ? (
                                <div className="relative aspect-video w-full h-32 mb-4 rounded-lg overflow-hidden border border-neutral-700">
                                    <img
                                        src={heroImage ? URL.createObjectURL(heroImage) : settings.heroImage.url}
                                        alt="Hero"
                                        className="w-full h-full object-cover"
                                    />
                                    {heroImage && (
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-amber-500 text-black text-[10px] font-black rounded uppercase">New</div>
                                    )}
                                </div>
                            ) : removeHeroImage && (
                                <div className="h-32 mb-4 rounded-lg border-2 border-dashed border-red-500/20 flex items-center justify-center text-red-500/50 text-xs font-bold uppercase tracking-widest bg-red-500/5">
                                    Image Marked for Removal
                                    <button
                                        type="button"
                                        onClick={() => setRemoveHeroImage(false)}
                                        className="ml-2 text-amber-500 hover:underline"
                                    >
                                        Undo
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    setHeroImage(e.target.files[0]);
                                    setRemoveHeroImage(false);
                                }}
                                className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-500/10 file:text-amber-500 hover:file:bg-amber-500/20"
                            />
                        </div>

                        <div className="p-4 bg-black/50 rounded-xl border border-neutral-700">
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-neutral-400">Homepage Hero Video</label>
                                {(heroVideo || (settings.heroVideo?.url && !removeHeroVideo)) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setHeroVideo(null);
                                            if (settings.heroVideo?.url) setRemoveHeroVideo(true);
                                        }}
                                        className="text-red-500 hover:text-red-400 p-1 transition-colors"
                                        title="Remove Video"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                            {(heroVideo || (settings.heroVideo?.url && !removeHeroVideo)) ? (
                                <div className="relative aspect-video w-full h-32 mb-4 rounded-lg overflow-hidden border border-neutral-700 bg-black">
                                    {heroVideo ? (
                                        <video src={URL.createObjectURL(heroVideo)} className="w-full h-full object-cover" muted />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-amber-500 font-mono truncate px-4">
                                            {settings.heroVideo.url}
                                        </div>
                                    )}
                                    {heroVideo && (
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-amber-500 text-black text-[10px] font-black rounded uppercase">New</div>
                                    )}
                                </div>
                            ) : removeHeroVideo && (
                                <div className="h-32 mb-4 rounded-lg border-2 border-dashed border-red-500/20 flex items-center justify-center text-red-500/50 text-xs font-bold uppercase tracking-widest bg-red-500/5">
                                    Video Marked for Removal
                                    <button
                                        type="button"
                                        onClick={() => setRemoveHeroVideo(false)}
                                        className="ml-2 text-amber-500 hover:underline"
                                    >
                                        Undo
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                    setHeroVideo(e.target.files[0]);
                                    setRemoveHeroVideo(false);
                                }}
                                className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-500/10 file:text-amber-500 hover:file:bg-amber-500/20"
                            />
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileText className="text-amber-500" size={20} />
                        About Section
                    </h3>
                    <textarea
                        value={settings.aboutText}
                        onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                        rows={10}
                        className="w-full bg-black border border-neutral-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    />
                </div>

                {/* Contact Information */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileText className="text-amber-500" size={20} />
                        Contact & Socials
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Email Address</label>
                            <input
                                type="email"
                                value={settings.contactInfo?.email || ''}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    contactInfo: { ...(settings.contactInfo || {}), email: e.target.value }
                                })}
                                className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Phone Number</label>
                            <input
                                type="text"
                                value={settings.contactInfo?.phone || ''}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    contactInfo: { ...(settings.contactInfo || {}), phone: e.target.value }
                                })}
                                className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Instagram Handle</label>
                            <input
                                type="text"
                                value={settings.contactInfo?.socialLinks?.instagram || ''}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    contactInfo: {
                                        ...(settings.contactInfo || {}),
                                        socialLinks: { ...(settings.contactInfo?.socialLinks || {}), instagram: e.target.value }
                                    }
                                })}
                                className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-neutral-800">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Save All Changes
                </button>
            </div>
        </form>
    );
};

export default WebsiteSettings;
