
export function BackgroundHalos() {
    return (
        <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
            <div className="absolute top-[5%] left-[10%] h-[300px] w-[500px] rounded-full bg-primary/20 blur-3xl"></div>
            <div className="absolute top-[25%] right-[15%] h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-3xl"></div>
            <div className="absolute bottom-[15%] left-[20%] h-[350px] w-[350px] rounded-full bg-emerald-500/20 blur-3xl"></div>
            <div className="absolute bottom-[5%] right-[5%] h-[500px] w-[500px] rounded-full bg-yellow-500/20 blur-3xl"></div>
            <div className="absolute top-[40%] left-[45%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl"></div>
        </div>
    )
}
