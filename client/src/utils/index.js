import { surpriseMePrompts } from "../constants";
import { saveAs } from "file-saver";

export const getRandomPrompt = (prompt) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];
  if (randomPrompt === prompt) return getRandomPrompt(prompt);
  return randomPrompt;
};

export async function downloadImage(_id, photo) {
  const response = await fetch(photo);
  const blob = await response.blob();
  saveAs(blob, `${_id}.jpg`);
}
