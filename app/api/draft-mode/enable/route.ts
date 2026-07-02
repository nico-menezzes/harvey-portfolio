import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/env";

// Turns on draft mode + the live preview when opened from the Presentation tool.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
});
