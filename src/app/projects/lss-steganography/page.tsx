import type { Metadata } from "next";
import Image from "next/image";
import ProjectDetail from "@/components/ProjectDetail";
import { lssSteganography as project } from "@/data/featured-projects";

export const metadata: Metadata = {
  title: "LSS Steganography | Pragati Jain",
  description: project.description,
};

const architecture = {
  src: "https://cdn.sanity.io/images/mke2ofjc/production/d1af382b9c99a923a017be9c63f3f15e4bfb0727-1536x1024.webp",
  alt: "Payload preparation uses tiktoken, Brotli, and per-tile BCH coding. A 1024 × 1024 cover is split into a 4 × 4 grid for DINOv2-guided embedding. Recovery reads image features, corrects errors, and decompresses the message.",
  caption: "AI-generated architecture illustration of payload preparation, image embedding, and message recovery.",
};

const optimization = {
  src: "https://cdn.sanity.io/images/mke2ofjc/production/2648e4181aed6a37e9a7ccc249c287a33cdbfb91-1536x1024.webp",
  alt: "The optimization loop applies texture and luminance masking with edge feathering, simulates JPEG compression and 8-bit quantization, and evaluates DINOv2 CLS features to update the perturbation.",
  caption: "AI-generated diagram of perceptual masking and transformation-aware optimization.",
};

function ProjectFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="space-y-3">
      <a href={src} target="_blank" rel="noopener noreferrer" className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        <Image src={src} alt={alt} width={1536} height={1024} className="h-auto w-full rounded-2xl" />
      </a>
      <figcaption className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{caption}</figcaption>
    </figure>
  );
}

export default function LssSteganographyPage() {
  return (
    <ProjectDetail project={project} coverCaption="AI-generated concept illustration of feature-guided information hiding.">
        <div className="space-y-9 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_p]:leading-relaxed">
          <section>
            <h2>Information hiding through visual features</h2>
            <p>I used DINOv2 ViT-L/14 CLS embeddings to guide where compressed payloads were embedded in 1024 × 1024 images. Small pixel perturbations carry the message, guided by learned visual features.</p>
          </section>
          <section>
            <h2>Payload preparation and error correction</h2>
            <p>The encoding scheme combines tiktoken and Brotli compression with a 4 × 4 tiled image layout and per-tile BCH(63, k) error correction. The pipeline supports up to 1,024 embedded bits. Compression and coding overhead determine how much source text fits.</p>
          </section>
          <ProjectFigure {...architecture} />
          <section>
            <h2>Robustness to JPEG and quantization</h2>
            <p>I implemented Expectation Over Transformation (EOT) using DiffJPEG to simulate multiple JPEG quality settings and a straight-through estimator for 8-bit quantization. Optimizing through these transformations supported payload recovery after JPEG compression down to quality 40.</p>
          </section>
          <section>
            <h2>Perceptual masking and tile boundaries</h2>
            <p>The perceptual mask combines local texture variance and Weber’s law luminance adaptation to control where perturbations are applied. Cosine edge feathering smooths tile boundaries and keeps the changes visually unobtrusive.</p>
          </section>
          <ProjectFigure {...optimization} />
          <section>
            <h2>Interactive demo and evaluation</h2>
            <p>I built a Streamlit demo for embedding and recovery and wrote automated evaluation scripts to track bit accuracy as image quality degrades.</p>
          </section>
        </div>
    </ProjectDetail>
  );
}
