/**
 * Formats a number according to the Indian Numbering System (lakhs & crores).
 * E.g., 1845600 -> "18,45,600"
 */
export function formatIndianNumber(num: number): string {
  if (isNaN(num)) return '0';
  const rounded = Math.round(num);
  const str = rounded.toString();
  
  if (str.length <= 3) return str;

  const lastThree = str.substring(str.length - 3);
  const otherNumbers = str.substring(0, str.length - 3);
  const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  
  return `${formattedOther},${lastThree}`;
}

/**
 * Formats Indian Currency (INR) with standard symbol and optional Lakh/Crore compact notation.
 * e.g., formatINR(1845600, true) -> "₹18.46 L"
 * e.g., formatINR(1845600, false) -> "₹18,45,600"
 */
export function formatINR(val: number, compact: boolean = false): string {
  if (isNaN(val)) return '₹0';
  const absVal = Math.abs(val);

  if (compact) {
    if (absVal >= 10000000) {
      const cr = (val / 10000000).toFixed(2);
      return `₹${parseFloat(cr)} Cr`;
    }
    if (absVal >= 100000) {
      const lakh = (val / 100000).toFixed(2);
      return `₹${parseFloat(lakh)} L`;
    }
  }

  return `₹${formatIndianNumber(val)}`;
}

/**
 * Formats waste diverted weight in kg.
 */
export function formatKg(val: number): string {
  if (isNaN(val)) return '0 kg';
  return `${val.toLocaleString('en-IN', { maximumFractionDigits: 1 })} kg`;
}

/**
 * Formats percentage.
 */
export function formatPercent(val: number): string {
  if (isNaN(val)) return '0%';
  return `${val.toFixed(1)}%`;
}

/**
 * Formats date to concise readable string: "28 Oct 2026, 14:20"
 */
export function formatDateTime(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } catch {
    return dateStr;
  }
}

