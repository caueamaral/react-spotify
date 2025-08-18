export default function Artists() {
    return  (
        <article>
            <h1 className="text-2xl font-medium">
                Artists recommended for you
            </h1>
            <section className="flex mt-4 gap-6">
                <div>
                    <figure className="bg-gray-400 h-36 w-36 rounded-md">
                        img
                    </figure>
                    <figcaption className="mt-2 text-gray-300 text-sm">
                        Artist Name
                    </figcaption>
                </div>
                <div>
                    <figure className="bg-gray-400 h-36 w-36 rounded-md">
                        img
                    </figure>
                    <figcaption className="mt-2 text-gray-300 text-sm">
                        Artist Name
                    </figcaption>
                </div>
                <div>
                    <figure className="bg-gray-400 h-36 w-36 rounded-md">
                        img
                    </figure>
                    <figcaption className="mt-2 text-gray-300 text-sm">
                        Artist Name
                    </figcaption>
                </div>  
            </section>
        </article>
    )
}