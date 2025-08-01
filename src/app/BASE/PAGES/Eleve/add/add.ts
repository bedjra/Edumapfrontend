import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  imports: [],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add implements OnInit {
  currentStep = 1;
  totalSteps = 3;
  loadingVisible = false;

  formData = new FormData();

  // Refs HTML (tu dois les binder avec templateRef ou ViewChild dans Angular si besoin)
  photoFile?: File;
  filePreviewVisible = false;
  imagePreviewSrc = '';
  fileNameText = '';

  ngOnInit(): void {
    this.updateUI();
  }

  goToNextStep(): void {
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.updateUI();
        this.updateSummary();
      }
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateUI();
    }
  }

  onPhotoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. Taille maximum: 5MB');
        input.value = '';
        return;
      }

      this.photoFile = file;
      this.fileNameText = `Fichier sélectionné: ${file.name}`;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreviewSrc = e.target?.result as string;
        this.filePreviewVisible = true;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.validateAllSteps()) return;

    this.formData = new FormData(
      document.querySelector('#studentForm') as HTMLFormElement
    );
    console.log('Données du formulaire:');

    this.formData.forEach((value, key) => {
      console.log(key, value);
    });

    // Simulation d'envoi
    const loading = document.getElementById('loading')!;
    const submitText = document.getElementById('submit-text')!;
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

    submitBtn.disabled = true;
    submitText.style.display = 'none';
    loading.style.display = 'inline-block';

    setTimeout(() => {
      alert('✅ Élève enregistré avec succès !');

      submitText.style.display = 'inline';
      loading.style.display = 'none';
      submitBtn.disabled = false;

      // Optionnel :
      // this.resetForm();
    }, 2000);
  }

  updateUI(): void {
    for (let i = 1; i <= this.totalSteps; i++) {
      const stepEl = document.getElementById(`step-${i}`);
      const stepContent = document.getElementById(`step-content-${i}`);

      stepEl?.classList.remove('active', 'completed');
      stepContent?.classList.remove('active');

      if (i === this.currentStep) {
        stepEl?.classList.add('active');
        stepContent?.classList.add('active');
      } else if (i < this.currentStep) {
        stepEl?.classList.add('completed');
      }
    }

    for (let i = 1; i < this.totalSteps; i++) {
      const line = document.getElementById(`line-${i}`);
      if (i < this.currentStep) {
        line?.classList.add('completed');
      } else {
        line?.classList.remove('completed');
      }
    }

    const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

    prevBtn.style.display = this.currentStep > 1 ? 'flex' : 'none';
    nextBtn.style.display =
      this.currentStep < this.totalSteps ? 'flex' : 'none';
    submitBtn.style.display =
      this.currentStep === this.totalSteps ? 'flex' : 'none';

    nextBtn.disabled = !this.validateCurrentStep();
  }

  validateCurrentStep(): boolean {
    const fields = this.getStepFields(this.currentStep);
    let isValid = true;

    fields.forEach((fieldName) => {
      const field = document.querySelector(
        `[name="${fieldName}"]`
      ) as HTMLInputElement | null;
      const error = document.getElementById(`${fieldName}-error`);

      if (field) {
        let valid = true;

        if (field.type === 'radio') {
          const radios = document.querySelectorAll(
            `[name="${fieldName}"]`
          ) as NodeListOf<HTMLInputElement>;
          valid = Array.from(radios).some((r) => r.checked);
        } else {
          valid = field.value.trim() !== '';
        }

        if (!valid) {
          field.classList.add('error');
          error?.classList.add('show');
          isValid = false;
        } else {
          field.classList.remove('error');
          error?.classList.remove('show');
        }
      }
    });

    return isValid;
  }

  validateAllSteps(): boolean {
    let allValid = true;
    for (let step = 1; step <= this.totalSteps; step++) {
      const fields = this.getStepFields(step);
      fields.forEach((fieldName) => {
        const field = document.querySelector(
          `[name="${fieldName}"]`
        ) as HTMLInputElement;
        if (field?.hasAttribute('required')) {
          if (field.type === 'radio') {
            const group = document.querySelectorAll(
              `[name="${fieldName}"]`
            ) as NodeListOf<HTMLInputElement>;
            if (!Array.from(group).some((r) => r.checked)) {
              allValid = false;
            }
          } else if (field.value.trim() === '') {
            allValid = false;
          }
        }
      });
    }
    return allValid;
  }

  getStepFields(step: number): string[] {
    switch (step) {
      case 1:
        return [
          'nom',
          'prenoms',
          'dateNaissance',
          'lieuNaissance',
          'nationalite',
          'sexe',
        ];
      case 2:
        return ['ecoleProvenance', 'classe', 'tuteurAssigne'];
      case 3:
        return [];
      default:
        return [];
    }
  }

  updateSummary(): void {
    if (this.currentStep === 3) {
      const fields = [
        'nom',
        'prenoms',
        'dateNaissance',
        'lieuNaissance',
        'nationalite',
        'sexe',
        'ecoleProvenance',
        'classe',
        'tuteurAssigne',
      ];

      fields.forEach((fieldName) => {
        const field = document.querySelector(
          `[name="${fieldName}"]`
        ) as HTMLInputElement;
        const summaryEl = document.getElementById(`summary-${fieldName}`);

        let value = 'Non renseigné';
        if (field) {
          if (field.type === 'radio') {
            const selected = document.querySelector(
              `[name="${fieldName}"]:checked`
            ) as HTMLInputElement;
            if (selected) value = selected.value;
          } else if (field.value.trim() !== '') {
            value = field.value;
            if (fieldName === 'dateNaissance') {
              value = new Date(field.value).toLocaleDateString('fr-FR');
            }
          }
        }

        if (summaryEl) summaryEl.textContent = value;
      });
    }
  }

  // Pour gérer les champs dynamiques (optionnel selon Angular template binding)
  onFieldChange(): void {
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
    nextBtn.disabled = !this.validateCurrentStep();
  }

  resetForm(): void {
    const form = document.getElementById('studentForm') as HTMLFormElement;
    form.reset();
    this.currentStep = 1;
    this.updateUI();
  }
}
