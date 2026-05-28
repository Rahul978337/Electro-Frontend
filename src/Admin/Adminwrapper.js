import React, { useEffect } from "react";

const AdminWrapper = ({ children }) => {
  useEffect(() => {
    // Only admin CSS
    const loadCSS = (href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      return link;
    };

    const adminCSS = [];
    adminCSS.push(loadCSS("/dist/css/adminlte.min.css"));
    adminCSS.push(loadCSS("/plugins/fontawesome-free/css/all.min.css"));
    adminCSS.push(loadCSS("/plugins/icheck-bootstrap/icheck-bootstrap.min.css"));

    // JS
    const loadScript = (src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };
    loadScript("/plugins/jquery/jquery.min.js");
    loadScript("/plugins/bootstrap/js/bootstrap.bundle.min.js");
    loadScript("/dist/js/adminlte.min.js");

    // Cleanup on unmount (so frontend CSS not affected)
    return () => {
      adminCSS.forEach(link => document.head.removeChild(link));
    };
  }, []);

  return <div className="hold-transition sidebar-mini">{children}</div>;
};

export default AdminWrapper;