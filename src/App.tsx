import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SimulationProvider } from './context/SimulationContext';
import { Landing } from './pages/Landing';
import { CommandCenter } from './pages/CommandCenter';
import { SimulationPage } from './pages/SimulationPage';
import { IncidentPage } from './pages/IncidentPage';
import { ResponsePage } from './pages/ResponsePage';
import { ImpactPage } from './pages/ImpactPage';
import { SettingsPage } from './pages/SettingsPage';

import { ErrorBoundary } from './components/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <SimulationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/command-center" element={<CommandCenter />} />
            <Route path="/simulation" element={<SimulationPage />} />
            <Route path="/incident/:id" element={<IncidentPage />} />
            <Route path="/response/:id" element={<ResponsePage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SimulationProvider>
    </ErrorBoundary>
  );
}

export default App;
