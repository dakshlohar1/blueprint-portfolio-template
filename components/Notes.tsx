import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import { Pin, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_NOTES: Note[] = [
    { id: 'n1', content: "Love the blueprint aesthetic. It really blends design and engineering well.", pinned: true, position: { x: 50, y: 150 }, rotation: -2 },
    { id: 'n2', content: "This interactive portfolio is a great idea. Very engaging!", pinned: true, position: { x: 300, y: 160 }, rotation: 3 },
    { id: 'n3', content: "Reminder: check out the source code for this notes section.", pinned: true, position: { x: 550, y: 140 }, rotation: -1 }
];

export const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>(() => {
        const savedNotes = localStorage.getItem('blueprint-user-notes');
        return savedNotes ? JSON.parse(savedNotes) : INITIAL_NOTES;
    });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        localStorage.setItem('blueprint-user-notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (!inputValue.trim()) return;
        const newNote: Note = {
            id: Date.now().toString(),
            content: inputValue,
            pinned: true,
            position: { x: Math.random() * 200, y: Math.random() * 100 + 100 }, // Randomish placement
            rotation: Math.random() * 6 - 3
        };
        setNotes([...notes, newNote]);
        setInputValue('');
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    return (
        <div className="relative min-h-[600px] w-full overflow-hidden border-t border-b border-dashed border-white/20 py-10 bg-blue-900/20">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-hand uppercase text-white mb-2">Notes Section</h2>
                <p className="font-mono text-xs text-white/60">Leave a note. It might persist through the void of a page refresh.</p>
            </div>

            {/* Input Area */}
            <div className="max-w-2xl mx-auto mb-16 relative z-20">
                <div className="bg-blueprint-bg/50 backdrop-blur border border-white/30 rounded p-1 flex shadow-blueprint">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Jot down a thought..."
                        className="flex-1 bg-transparent border-none outline-none px-4 py-3 font-hand text-xl placeholder-white/30 text-white"
                        onKeyDown={(e) => e.key === 'Enter' && addNote()}
                    />
                    <button
                        onClick={addNote}
                        className="bg-white/10 cursor-pointer hover:bg-white/20 border-l border-white/30 px-6 text-sm font-mono uppercase tracking-wider transition-colors"
                    >
                        Add Note
                    </button>
                </div>
            </div>

            {/* Notes Field */}
            <div className="relative w-full h-[400px] max-w-6xl mx-auto border border-white/10 rounded-xl bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] overflow-hidden">
                <div className="absolute top-2 right-2 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>

                <AnimatePresence mode="popLayout">
                    {notes.map((note) => (
                        <motion.div
                            key={note.id}
                            drag
                            dragConstraints={{ left: 0, right: 800, top: 0, bottom: 300 }}
                            initial={{ opacity: 0, scale: 0.8, x: note.position.x, y: note.position.y, rotate: note.rotation }}
                            animate={{ opacity: 1, scale: 1, x: note.position.x, y: note.position.y, rotate: note.rotation }}
                            exit={{
                                y: 600,
                                opacity: 0,
                                rotate: note.rotation + Math.random() * 40 + 20,
                                scale: 0.9,
                                skewX: 20,
                                filter: 'blur(2px)',
                                transition: { duration: 0.5, ease: "backIn" }
                            }}
                            className="absolute w-64 p-4 bg-blueprint-bg/90 backdrop-blur border border-white/40 shadow-lg cursor-grab active:cursor-grabbing group"
                            style={{ borderRadius: '2px' }}
                        >
                            {/* Pin Icon */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white/70 z-10 pointer-events-none">
                                <Pin className="w-5 h-5 fill-current" />
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNote(note.id);
                                }}
                                onPointerDown={(e) => e.stopPropagation()}
                                className="absolute -top-2 -right-2 bg-blue-900 border border-white/20 p-1.5 rounded-full text-white/60 hover:text-red-400 hover:border-red-400 hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-20"
                                title="Delete Note"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>

                            <div className="font-hand text-xl leading-snug mb-4 text-white">
                                "{note.content}"
                            </div>

                            <div className="flex justify-between items-center border-t border-dashed border-white/20 pt-2">
                                <span className="text-[10px] font-mono text-white/40">NOTE-{note.id.slice(-4)}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {notes.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-2xl uppercase">
                        [ Empty Canvas ]
                    </div>
                )}
            </div>
        </div>
    );
};