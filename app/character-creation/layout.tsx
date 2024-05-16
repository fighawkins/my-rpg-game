// src/app/character-creation/layout.tsx
import { ReactNode } from 'react';

type CharacterCreationLayoutProps = {
    children: ReactNode;
};

export default function CharacterCreationLayout({ children }: CharacterCreationLayoutProps) {
    return (
        <div>
            {children}
        </div>
    );
}
