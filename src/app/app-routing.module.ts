import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AuthLayoutComponent } from "./shared/components/layouts/auth-layout/auth-layout.component";
import { AuthGaurd } from "./shared/services/auth.gaurd";
import { BlankLayoutComponent } from "./shared/components/layouts/blank-layout/blank-layout.component";
import { AdminLayoutSidebarCompactComponent } from "./shared/components/layouts/admin-layout-sidebar-compact/admin-layout-sidebar-compact.component";
import { AdminLayoutSidebarLargeComponent } from "./shared/components/layouts/admin-layout-sidebar-large/admin-layout-sidebar-large.component";

const adminRoutes: Routes = [
  {
    path: "home",
    canActivate: [AuthGaurd],
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomeModule),
  },
  {
    path:"merchant",
    canActivate:[AuthGaurd],
    loadChildren:() =>
    import("./pages/merchant/merchant.module").then((m)=>m.MerchantModule),
    
  },
  {
    path:"sub-merchant",
    canActivate:[AuthGaurd],
    loadChildren:() =>
    import("./pages/sub merchant/submerchant.module").then((m)=>m.SubMerchantModule),
    
  },
  {
    path:"static-QR",
    canActivate:[AuthGaurd],
    loadChildren:() =>
    import("./pages/static qr/staticQR.module").then((m)=>m.StaticQRModule),
    
  },
  {
    path:"dynamic-QR",
    canActivate:[AuthGaurd],
    loadChildren:() =>
    import("./pages/dynamic qr/dynamicQR.module").then((m)=>m.DynamicQRModule),
    
  },
  {
    path:"verify-vpa",
    canActivate:[AuthGaurd],
    loadChildren:() =>
    import("./pages/verify vpa/verify_VPA.module").then((m)=>m.VerifyVPAModule),
    
  },
  {
    path: "reports",
    canActivate: [AuthGaurd],
    loadChildren: () =>
      import("./pages/reports/reports.module").then((m) => m.ReportsModule),
  },
  {
    path: "recharge",
    canActivate: [AuthGaurd],
    loadChildren: () =>
      import("./pages/recharge/recharge.module").then((m) => m.RechargeModule),
  },
  {
    path: "cash-collection",
    canActivate: [AuthGaurd],
    loadChildren: () =>
      import("./pages/cash-collection/cash-collection.module").then((m) => m.CashCollectionModule),
  },
  {
    path: "flight",
    canActivate: [AuthGaurd],
    loadChildren: () =>
      import("./pages/flight/flight.module").then((m) => m.FlightModule),
  },
  {
    path: "**",
    redirectTo: "others/404",
  },
];

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "sessions",
        canActivate: [AuthGaurd],
        loadChildren: () =>
          import("./pages/sessions/sessions.module").then(
            (m) => m.SessionsModule
          ),
      },
    ],
  },
  {
    path: "",
    component: BlankLayoutComponent,
    children: [
      {
        path: "others",
        loadChildren: () =>
          import("./views/others/others.module").then((m) => m.OthersModule),
      },
    ],
  },
  {
    path: "",
    component: AdminLayoutSidebarLargeComponent,
    canActivate: [AuthGaurd],
    children: adminRoutes,
  },
  {
    path: "**",
    redirectTo: "others/404",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
