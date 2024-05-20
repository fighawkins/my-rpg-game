// src/components/Welcome/WelcomeScreen.tsx
import Link from 'next/link';

export default function WelcomeScreen() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  p-4 text-black">
            <div className="bg-[#FFFDDD] rounded-lg shadow-lg p-6 w-full max-w-4xl text-center">
                <h1 className="text-4xl font-bold mb-4 text-[#2F4F4F]">Welcome to My RPG Game</h1>
                <p className="text-lg mb-4 text-black">
                    Experience a first-of-its-kind, fully interactive story and adventure game. Combining AI and custom programming, dive into an entire world with rich lore, unique characters, and dynamic events.
                </p>
                <Link href="/character-creation/species">
                    <button className="mt-8 px-8 py-3 bg-green-600 text-white text-lg rounded-lg shadow-md hover:bg-green-700 transition-colors">
                        Start Game
                    </button>
                </Link>
            </div>
        </div>
    );
}
