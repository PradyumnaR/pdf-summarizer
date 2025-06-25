'use client';

import { Card } from '@/components/ui/card';
import { useState } from 'react';

import NavigationControls from './NavigationControls';

const parseSection = (section: string) => {
  const [title, ...content] = section.split('\n');

  const cleanTitle = title.startsWith('#')
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];
  let currentPoint = '';

  content.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('.')) {
      if (currentPoint) {
        points.push(currentPoint.trim());
        currentPoint = trimmedLine;
      } else if (!trimmedLine) {
        if (currentPoint) {
          points.push(currentPoint.trim());
        }
        currentPoint = '';
      } else {
        currentPoint += ' ' + trimmedLine;
      }
    }
  });

  if (currentPoint) {
    points.push(currentPoint.trim());
  }

  return {
    title: cleanTitle,
    points: points.filter(
      (point) =>
        point && !point.startsWith('#') && !point.startsWith('[Choose'),
    ),
  };
};

function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);

  const handleNext = () =>
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));

  const handlePrevious = () =>
    setCurrentSection((prev) => Math.max(prev - 1, 0));

  const handleSectionSelect = (index: number) =>
    setCurrentSection(Math.min(Math.max(index, 0), sections.length - 1));

  const sections = summary
    .split('\n# ')
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  console.log(sections[currentSection]);
  return (
    <Card className="relative px-2 h-[300px] sm:h-[400px] lg:h-[500px] w-full xl:w-[600px] overflow-hidden shadow-2xl rounded-3xl">
      <div className="h-full overflow-y-auto scrollbar-hidden pt-12 sm:pt-16 sm:pb-24">
        <div className="px-4 sm:px-6">
          <h2 className="flex items-center justify-center p-4 font-bold">
            {sections[currentSection]?.title || ''}
          </h2>
          <ul>
            {sections[currentSection]?.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={handleSectionSelect}
      />
    </Card>
  );
}

export default SummaryViewer;
