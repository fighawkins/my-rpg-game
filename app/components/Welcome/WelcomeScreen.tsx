// src/components/Welcome/WelcomeScreen.tsx
import Link from 'next/link';

export default function WelcomeScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-500 mb-4">Welcome to My RPG Game</h1>
            <Link href="/character-creation/species" className="px-4 py-2 bg-blue-500 text-white rounded">
                Start Game
            </Link>
        </div>
    );
}
