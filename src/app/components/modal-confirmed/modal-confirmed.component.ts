import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-confirmed',
  templateUrl: './modal-confirmed.component.html',
  styleUrls: ['./modal-confirmed.component.css'],
})
export class ModalConfirmedComponent {
  ngOnInit() {
    document.addEventListener('click', (event) => {
      this.closeModal('modal-confirmed');
      this.closeModal('modal-rejected');
    });
  }

  public openModal() {
    const modal = document.getElementById('modal-confirmed');
    if (modal) modal.style.display = 'block';
    if (modal) modal.style.opacity = '1';
    setTimeout(() => {
      this.closeModal('modal-confirmed');
    }, 2000);
  }

  public modalRejected() {
    const modal = document.getElementById('modal-rejected');
    if (modal) modal.style.display = 'block';
    if (modal) modal.style.opacity = '1';
    setTimeout(() => {
      this.closeModal('modal-rejected');
    }, 2000);
  }

  public closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
    if (modal) modal.style.opacity = '0';
  }
}
