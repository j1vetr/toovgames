import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export function PrivacyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl bg-[#111118] border border-white/[0.06] p-8 md:p-12"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all"
            >
              ✕
            </button>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-white/80 mb-8">
              {t('Privacy Policy & KVKK', 'Gizlilik Politikası & KVKK')}
            </h2>

            <div className="space-y-6 text-sm text-white/40 leading-relaxed">
              <section>
                <h3 className="text-white/60 font-semibold text-base mb-3">
                  {t('1. Data Controller', '1. Veri Sorumlusu')}
                </h3>
                <p>
                  {t(
                    'TOOV Games ("we", "us", or "our") operates the website toovgames.com. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website.',
                    'TOOV Games ("biz"), toovgames.com web sitesini işletmektedir. Bu sayfa, web sitemizi kullandığınızda kişisel verilerinizin toplanması, kullanılması ve paylaşılmasına ilişkin politikamızı açıklamaktadır.'
                  )}
                </p>
              </section>

              <section>
                <h3 className="text-white/60 font-semibold text-base mb-3">
                  {t('2. Data Collected', '2. Toplanan Veriler')}
                </h3>
                <p>
                  {t(
                    'Our website does not collect any personal data directly. We do not use cookies for tracking, and we do not require user registration. The only data processed may include anonymized analytics data (page views, browser type, device type) through standard web server logs.',
                    'Web sitemiz doğrudan herhangi bir kişisel veri toplamamaktadır. Takip amacıyla çerez kullanmıyoruz ve kullanıcı kaydı gerektirmiyoruz. İşlenen veriler, yalnızca standart web sunucu günlükleri aracılığıyla elde edilen anonim analitik verilerden (sayfa görüntüleme, tarayıcı türü, cihaz türü) oluşabilir.'
                  )}
                </p>
              </section>

              <section>
                <h3 className="text-white/60 font-semibold text-base mb-3">
                  {t('3. Purpose of Processing', '3. Verilerin İşlenme Amacı')}
                </h3>
                <p>
                  {t(
                    'Any data processed is used solely for the purpose of improving our website performance and user experience. We do not sell, trade, or transfer your information to third parties.',
                    'İşlenen veriler yalnızca web sitemizin performansını ve kullanıcı deneyimini iyileştirmek amacıyla kullanılmaktadır. Bilgilerinizi üçüncü taraflara satmıyor, takas etmiyor veya aktarmıyoruz.'
                  )}
                </p>
              </section>

              <section>
                <h3 className="text-white/60 font-semibold text-base mb-3">
                  {t('4. Your Rights (KVKK Article 11)', '4. Haklarınız (KVKK Madde 11)')}
                </h3>
                <p>
                  {t(
                    'Under the Turkish Personal Data Protection Law (KVKK, Law No. 6698), you have the right to: learn whether your personal data is being processed, request information about the processing, learn the purpose of the processing, know third parties to whom your data is transferred, request correction of incomplete or inaccurate data, request deletion or destruction of your data, and object to any result that arises against you through the analysis of your data.',
                    'Kişisel Verilerin Korunması Kanunu (6698 sayılı KVKK) kapsamında şu haklara sahipsiniz: kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini isteme ve işlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme.'
                  )}
                </p>
              </section>

              <section>
                <h3 className="text-white/60 font-semibold text-base mb-3">
                  {t('5. GDPR Compliance', '5. GDPR Uyumu')}
                </h3>
                <p>
                  {t(
                    'For visitors from the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). You have the right to access, rectify, erase, restrict processing, data portability, and object to the processing of your personal data. As our website does not collect personal data, these rights are inherently respected.',
                    'Avrupa Ekonomik Alanı\'ndan (AEA) gelen ziyaretçiler için Genel Veri Koruma Tüzüğü\'ne (GDPR) uyum sağlamaktayız. Kişisel verilerinize erişim, düzeltme, silme, işlemeyi kısıtlama, veri taşınabilirliği ve işlemeye itiraz haklarınız bulunmaktadır. Web sitemiz kişisel veri toplamadığından, bu haklar doğası gereği korunmaktadır.'
                  )}
                </p>
              </section>

              <section>
                <h3 className="text-white/60 font-semibold text-base mb-3">
                  {t('6. Contact', '6. İletişim')}
                </h3>
                <p>
                  {t(
                    'If you have any questions about this privacy policy or wish to exercise your rights, please contact us:',
                    'Bu gizlilik politikası hakkında sorularınız varsa veya haklarınızı kullanmak istiyorsanız, bizimle iletişime geçebilirsiniz:'
                  )}
                </p>
                <div className="mt-3 space-y-1 text-white/50">
                  <p>Email: hello@toovgames.com</p>
                  <p>{t('Phone', 'Telefon')}: 0850 309 47 69</p>
                </div>
              </section>

              <section>
                <p className="text-white/25 text-xs mt-4">
                  {t('Last updated: April 2026', 'Son güncelleme: Nisan 2026')}
                </p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
