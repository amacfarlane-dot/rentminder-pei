import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t bg-card mt-auto">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="RentMinder" className="h-10 w-auto" />
          </Link>
          <p className="text-sm text-muted-foreground">
            Rental transparency for Prince Edward Island. Know before you rent.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3 font-body text-foreground">For Tenants</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/search" className="hover:text-foreground transition-colors">Search Properties</Link></li>
            <li><Link to="/dispute-tools" className="hover:text-foreground transition-colors">Dispute Tools</Link></li>
            <li><Link to="/blog" className="hover:text-foreground transition-colors">Tenant Resources</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3 font-body text-foreground">For Landlords</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing Plans</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            <li><Link to="/blog" className="hover:text-foreground transition-colors">Landlord Resources</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3 font-body text-foreground">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
        <p>© 2026 RentMinder. Built for PEI renters and landlords. Not affiliated with IRAC or the Government of PEI.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
