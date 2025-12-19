"use client";

import { ChevronUp, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
  FaWhatsapp,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import useSettingStore from "@/hooks/use-setting-store";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { i18n } from "@/i18n-config";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    setting: { site, availableCurrencies, currency },
    setCurrency,
  } = useSettingStore();

  const { locales } = i18n;
  const locale = useLocale();
  const t = useTranslations();

  return (
    <footer className="bg-red-900 text-white underline-link">
      <div className="w-full">
        <Button
          variant="ghost"
          className="bg-yellow-900 w-full rounded-none"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp className="mr-2 h-4 w-4" />
          {t("Footer.Back to top")}
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
          <div>
            <h3 className="font-bold mb-2">{t("Footer.Get to Know Us")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/page/careers">{t("Footer.Careers")}</Link>
              </li>
              <li>
                <Link href="/page/blog">{t("Footer.Blog")}</Link>
              </li>
              <li>
                <Link href="/page/about-us">
                  {t("Footer.About name", { name: site.name })}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">{t("Footer.Make Money with Us")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/page/sell">
                  {t("Footer.Sell products on", { name: site.name })}
                </Link>
              </li>
              <li>
                <Link href="/page/become-affiliate">
                  {t("Footer.Become an Affiliate")}
                </Link>
              </li>
              <li>
                <Link href="/page/advertise">
                  {t("Footer.Advertise Your Products")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">{t("Footer.Let Us Help You")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/page/shipping">
                  {t("Footer.Shipping Rates & Policies")}
                </Link>
              </li>
              <li>
                <Link href="/page/returns-policy">
                  {t("Footer.Returns & Replacements")}
                </Link>
              </li>
              <li>
                <Link href="/page/help">{t("Footer.Help")}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4 flex-wrap md:flex-nowrap">
              <Image
                src="/icons/logo.svg"
                alt={`${site.name} logo`}
                width={48}
                height={48}
                className="w-14"
              />

              {/* 🔥 FIXED LANGUAGE SELECT */}
              <Select
                value={locale}
                onValueChange={(value) =>
                  router.push(pathname, { locale: value })
                }
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("Footer.Select a language")}
                  />
                </SelectTrigger>

                <SelectContent>
                  {locales.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-1">
                        <span className="text-lg">{lang.icon}</span>
                        {lang.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* 🔥 FIXED CURRENCY SELECT */}
              <Select
                value={currency}
                onValueChange={(value) => setCurrency(value)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={t("Footer.Select a currency")}
                  />
                </SelectTrigger>

                <SelectContent>
                  {availableCurrencies
                    .filter((x) => x.code)
                    .map((cur) => (
                      <SelectItem key={cur.code} value={cur.code}>
                        {cur.name} ({cur.code})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-6 text-xl mt-4">
              <Link href="https://wa.me/9643860819" target="_blank">
                <FaWhatsapp className="text-green-500" />
              </Link>
              <Link href="https://youtube.com/@mz-udaan0786?si=rfYpDYkBi27o7gsj" target="_blank">
                <FaYoutube className="text-red-500" />
              </Link>
              <Link href="https://www.facebook.com/people/Munna-Ansari/pfbid02K6eUQWsqbtLyTrHkrcFuqxxZQPPQjHVq8YeLmRhzFnnzviF4Ri74HqjcBWugGASZl/?mibextid=wwXIfr&rdid=iaB4KfIA4NE1J63y&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AXBLQ9Gm1%2F%3Fmibextid%3DwwXIfr" target="_blank">
                <FaFacebook className="text-blue-600" />
              </Link>
              <Link href="https://www.instagram.com/munaansari_07?igsh=MWNuemRiZWpoOTBrcA%3D%3D&utm_source=qr" target="_blank">
                <FaInstagram className="text-pink-500" />
              </Link>
              <Link href="https://maps.app.goo.gl/JjHotMsp9awdKjH37" target="_blank">
                <FaMapMarkerAlt className="text-yellow-400" />
              </Link>
              <Link href="/contact">
                <FaEnvelope className="text-green-600" />
              </Link>
            </div>

            {/* External Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm mt-4">
              <Link
                href="https://corrbee.vercel.app/"
                target="_blank"
                className="flex items-center gap-1 hover:text-yellow-400"
              >
                <Globe className="w-4 h-4" />
                <span>corrbee.com</span>
              </Link>

              <Link
                href="https://arman-hosiery.vercel.app/"
                target="_blank"
                className="flex items-center gap-1 hover:text-yellow-400"
              >
                <Globe className="w-4 h-4" />
                <span>arman-hosiery.in</span>
              </Link>

              <Link
                href="/verify"
                className="hover:text-green-400 flex items-center gap-1"
              >
                <FaShieldAlt className="text-green-400" />
                Verify Product
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 text-sm text-center">
        <div className="flex justify-center gap-3">
          <Link href="/page/conditions-of-use">
            {t("Footer.Conditions of Use")}
          </Link>
          <Link href="/page/privacy-policy">
            {t("Footer.Privacy Notice")}
          </Link>
          <Link href="/page/help">{t("Footer.Help")}</Link>
        </div>

        <p className="mt-2">© {site.copyright}</p>

        <div className="mt-4 text-gray-400">
          {site.address} | {site.phone}
        </div>
      </div>
    </footer>
  );
}
