import React from 'react';
import { Icon } from '@iconify/react';
import { BillingInfo } from '../../utils/profileMockData';

interface BillingSectionProps {
  billing: BillingInfo;
}

const BillingSection: React.FC<BillingSectionProps> = ({ billing }) => {
  return (
    <div className="bg-[#151823] rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Billing</h2>

      <div className="space-y-6">
        <div className="bg-[#1C1F2E] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Icon 
                icon={`solar:${billing.cardType.toLowerCase()}-bold`}
                className="w-8 h-8 text-blue-500 mr-3"
              />
              <div>
                <p className="font-medium">•••• {billing.lastFour}</p>
                <p className="text-sm text-gray-400">Expires {billing.expiryDate}</p>
              </div>
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300">
              Change
            </button>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Next billing date</span>
              <span>{new Date(billing.nextBillingDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-400">Amount</span>
              <span>${billing.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4">Recent Invoices</h3>
          <div className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#1C1F2E] rounded-lg p-3 text-sm"
              >
                <div className="flex items-center">
                  <Icon icon="solar:document-bold" className="w-5 h-5 text-gray-400 mr-3" />
                  <span>March {2024 - index}</span>
                </div>
                <button className="text-blue-400 hover:text-blue-300">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSection;