'use client';
import React, { useState, Suspense, lazy, useEffect } from 'react';
import Editor from '../components/Editor/Editor';
import Navbar from '../components/Navbar';
import QueryHistory from '../components/Queries/QueryHistory';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { fetchInitialData } from '@/lib/fetchData';
import Provider from './provider';

const OutputDisplay = lazy(() => import('../components/Output/OutputDisplay'));

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [value, setValue] = useState<string>(query);
  const [submittedQuery, setSubmittedQuery] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [verticalSizes, setVerticalSizes] = useState<number[]>([60, 40]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchInitialData();
      setQuery(data.initialQuery);
      setValue(data.initialQuery);
    }
    fetchData();
  }, []);

  const usePredefinedQuery = (value: string) => {
    setQuery(value);
    setValue(value);
  };

  const runQuery = () => {
    setSubmittedQuery(query);
    setLoading(false);
  };

 
  const handleVerticalResize = (sizes: number[]) => {
    setVerticalSizes(sizes);
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <Provider>
      <div className="flex flex-col h-screen">
        <Navbar usePredefinedQuery={usePredefinedQuery} setValue={setValue} />
        <div className="flex-grow min-h-0 flex">
          {!isFullScreen && (
            <div className="w-1/5 border-r border-gray-300">
              <QueryHistory
                history={history}
                setHistory={setHistory}
                setQuery={setQuery}
                setValue={setValue}
              />
            </div>
          )}
          <div className={`flex-grow ${isFullScreen ? 'w-full' : 'w-4/5'}`}>
            <ResizablePanelGroup
              direction="vertical"
              className="h-full"
              onLayout={handleVerticalResize}
            >
              <ResizablePanel defaultSize={verticalSizes[0]}>
                <div className="h-full w-full">
                  <Editor
                    query={query}
                    setQuery={setQuery}
                    runQuery={runQuery}
                    usePredefinedQuery={usePredefinedQuery}
                    history={history}
                    setSubmittedQuery={setSubmittedQuery}
                    setHistory={setHistory}
                    value={value}
                    setValue={setValue}
                    isFullScreen={isFullScreen}
                    setIsFullScreen={toggleFullScreen}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={verticalSizes[1]}>
                <Suspense fallback={<div>Loading...</div>}>
                  <OutputDisplay
                    submittedQuery={submittedQuery}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </Suspense>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </Provider>
  );
}
