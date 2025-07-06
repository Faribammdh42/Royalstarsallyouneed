import DebitCard from '../../components/DebitCard';
import PaymentGateway from '../../components/PaymentGateway';
import BillingSystem from '../../components/BillingSystem';

export default function BankingPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          سیستم بانکداری بانک صادرات
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          <div className="flex justify-center">
            <DebitCard 
              cardNumber="6274129012345678"
              holderName="علی احمدی"
              expiryDate="12/28"
              balance={15000000}
            />
          </div>
          
          <div>
            <PaymentGateway />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg">
          <BillingSystem />
        </div>
      </div>
    </main>
  );
}