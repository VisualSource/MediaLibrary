const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-6xl mb-8 font-bold">Oops!</h1>
            <p className="text-xl mb-2">Sorry, this page does not seem to exist!</p>
            <p className="text-gray-400">
                <i>404 Page Not Found</i>
            </p>
        </div>
    );
}

export default NotFound;