import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, config?: Partial<MatSnackBarConfig>): void {
    const footerHeight = window.innerHeight * 0.1; // 10% of viewport height (10vh)
    const defaultConfig: MatSnackBarConfig = {
      duration: 3000,
      verticalPosition: 'bottom', // Default vertical position
      panelClass: 'snackbar-footer', // Add custom class for additional styling
      ...config // Merge with custom config if provided
    };

    // Use a type assertion to tell TypeScript that the string format is compatible with MatSnackBarVerticalPosition
    defaultConfig.verticalPosition = `${window.innerHeight - footerHeight}px` as MatSnackBarVerticalPosition;

    this.snackBar.open(message, 'Close', defaultConfig);
  }
}
