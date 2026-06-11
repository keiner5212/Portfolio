"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { memo, useEffect, useState } from "react";

function getAutoplay(): boolean {
	if (typeof window === "undefined") return true;
	return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const ProjectImage = memo(function ProjectImage({
	image,
	projectTitle,
	index,
}: {
	image: string;
	projectTitle: string;
	index: number;
}) {
	return (
		<div className="flex justify-center items-center w-full aspect-[16/10] overflow-hidden">
			<Image
				src={image}
				width={400}
				height={250}
				alt={`${projectTitle} preview ${index + 1}`}
				className="w-full h-full object-cover"
				sizes="(max-width: 640px) 90vw, 400px"
				priority={index === 0}
			/>
		</div>
	);
});

export function ProjectGallery({
	images,
	title,
}: {
	images: string[];
	title: string;
}) {
	const [autoplay, setAutoplay] = useState(true);

	useEffect(() => {
		setAutoplay(getAutoplay());
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const onChange = () => setAutoplay(getAutoplay());
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	if (images.length > 1) {
		return (
			<Slider
				dots={false}
				infinite
				speed={500}
				slidesToShow={1}
				slidesToScroll={1}
				autoplay={autoplay}
				autoplaySpeed={3000}
				className="w-full"
			>
				{images.map((image, i) => (
					<ProjectImage
						key={`${title}-${i}`}
						image={image}
						projectTitle={title}
						index={i}
					/>
				))}
			</Slider>
		);
	}
	return <ProjectImage image={images[0]} projectTitle={title} index={0} />;
}
