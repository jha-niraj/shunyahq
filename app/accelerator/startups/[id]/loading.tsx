export const runtime = 'edge';

export default function Loading() {
    return (
        <main className="relative bg-so-bg min-h-screen">
            <div className="so-container py-[clamp(80px,10vw,120px)]">
                <div className="animate-pulse">
                    <div className="h-4 w-32 bg-so-surface-2 rounded mb-8" />
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="so-card p-[clamp(24px,4vw,40px)]">
                                <div className="flex flex-col md:flex-row md:items-center gap-5 mb-8 pb-8 border-b border-so-line">
                                    <div className="h-16 w-16 bg-so-surface-2 rounded-2xl shrink-0" />
                                    <div className="space-y-3 w-full">
                                        <div className="h-8 bg-so-surface-2 rounded w-3/4" />
                                        <div className="h-4 bg-so-surface-2 rounded w-full" />
                                        <div className="flex gap-2">
                                            <div className="h-6 w-20 bg-so-surface-2 rounded-full" />
                                            <div className="h-6 w-24 bg-so-surface-2 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-7">
                                    <div className="space-y-3">
                                        <div className="h-3 bg-so-surface-2 rounded w-1/4" />
                                        <div className="h-4 bg-so-surface-2 rounded w-full" />
                                        <div className="h-4 bg-so-surface-2 rounded w-full" />
                                        <div className="h-4 bg-so-surface-2 rounded w-3/4" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-3 bg-so-surface-2 rounded w-1/4" />
                                        <div className="h-4 bg-so-surface-2 rounded w-full" />
                                        <div className="h-4 bg-so-surface-2 rounded w-5/6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div className="so-card p-7">
                                <div className="h-3 bg-so-surface-2 rounded w-1/2 mb-5" />
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="h-4 w-4 bg-so-surface-2 rounded-full" />
                                            <div className="space-y-1.5">
                                                <div className="h-3 bg-so-surface-2 rounded w-16" />
                                                <div className="h-4 bg-so-surface-2 rounded w-24" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="h-11 bg-so-surface-2 rounded-full w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
