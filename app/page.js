export default function Home() {
    return (
        <main>
            <div className="h-[70px]"></div>

            <div className="max-w-5xl m-auto p-8 flex flex-col gap-5">
                <h1 className="text-secondary text-3xl font-bold">All Recipes</h1>

                <div className="filter-btns">
                    <input className="join-item btn btn-outline font-normal" type="radio" name="options" aria-label="All" />
                    <input className="join-item btn btn-outline font-normal" type="radio" name="options" aria-label="Breakfast" />
                    <input className="join-item btn btn-outline font-normal" type="radio" name="options" aria-label="Lunch" />
                </div>
            </div>

        </main>
    )
}