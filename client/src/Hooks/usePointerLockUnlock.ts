import { useRef, useEffect } from "react";
import { useGardenStore } from "../gardenStore";

export const usePointerLockUnlock = (
  pointerLockRef: React.MutableRefObject<any>
) => {
  // Make sure that we don't try to re-enable pointer lock too soon after disabling with Escape key.
  // https://discourse.threejs.org/t/how-to-avoid-pointerlockcontrols-error/33017
  // Strategy: Detect when pointer lock ends via Escape key.
  // If via escape key, for 1.5 seconds we block re-enables and keep store isPointerLock false.

  const { isPointerLock, setIsPointerLock } = useGardenStore();
  const localUnlocked = useRef(false);
  const escapeUnlockedTime = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isPointerLock) {
      if (
        pointerLockRef.current &&
        (!escapeUnlockedTime.current ||
          (escapeUnlockedTime.current &&
            Date.now() - escapeUnlockedTime.current > 1500))
      ) {
        // If pointer lock was disabled programmatically (caused by some click in the app)...
        // Or if it has been disabled for more than 1.5 seconds:
        // Re-enable pointer lock and reset flags.
        pointerLockRef.current.lock();
        localUnlocked.current = false;
        escapeUnlockedTime.current = undefined;
      } else {
        // If pointer lock was disabled < 1500ms ago by user pressing Escape key:
        // Don't do the .lock() and reset store isPointerLock to false
        setIsPointerLock(false);
      }
    } else if (pointerLockRef.current) {
      if (localUnlocked.current == true) {
        // If the local unlock precedes the global unlock, it was done with Escape key.
        // Mark the time this happened.
        escapeUnlockedTime.current = Date.now();
      }
      // Reset the local unlock flag
      localUnlocked.current = false;
      pointerLockRef.current.unlock();
    }
  }, [isPointerLock]);

  const handleUnlock = () => {
    // Set the local unlock flag.
    localUnlocked.current = true;
    setIsPointerLock(false);
  };

  return { handleUnlock };
};
