import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import useReligionTugas from '../_hooks/useReligionTugas';

const AddReligionTaskDialog = ({ isOpen, onClose, onAddManual }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedReligion, setSelectedReligion] = useState('');
  const { createAutoTask } = useReligionTugas();

  const handleCreateAutoTask = async () => {
    if (selectedReligion) {
      await createAutoTask(selectedReligion);
      onClose();
    }
  };

  const resetState = () => {
    setSelectedOption(null);
    setSelectedReligion('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) resetState();
      onClose();
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-white">Tambah Tugas Keagamaan</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button 
              onClick={() => setSelectedOption('manual')} 
              className={`w-1/2 hover:bg-slate-100 hover:text-[#1E4395] ${selectedOption === 'manual' ? 'bg-white text-[#1E4395]' : 'bg-[#1E4395] text-white border border-white'}`}
            >
              Manual
            </Button>
            <Button 
              onClick={() => setSelectedOption('auto')} 
              className={`w-1/2 hover:bg-slate-100 hover:text-[#1E4395] ${selectedOption === 'auto' ? 'bg-white text-[#1E4395]' : 'bg-[#1E4395] text-white border border-white'}`}
            >
              Otomatis
            </Button>
          </div>

          {selectedOption === 'manual' && (
            <Button onClick={onAddManual} className="w-full bg-white text-[#1E4395] hover:bg-slate-100">
              Lanjut ke Form Manual
            </Button>
          )}

          {selectedOption === 'auto' && (
            <div className="space-y-4">
              <p className="text-sm text-white">Harap pilih agama:</p>
              <select 
                onChange={(e) => setSelectedReligion(e.target.value)} 
                value={selectedReligion}
                className="w-full p-2 bg-white text-[#1E4395] border-none rounded-md "
              >
                <option value="">Pilih Agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
              </select>
              <Button 
                onClick={handleCreateAutoTask} 
                disabled={!selectedReligion} 
                className="w-full bg-white text-[#1E4395] disabled:bg-gray-300 disabled:text-gray-500 hover:bg-slate-100" 
              >
                Buat Tugas Otomatis
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddReligionTaskDialog;