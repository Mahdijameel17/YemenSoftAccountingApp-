package io.ionic.starter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

import static android.Manifest.permission.INTERNET;
import static android.Manifest.permission.MANAGE_EXTERNAL_STORAGE;
import static android.Manifest.permission.READ_EXTERNAL_STORAGE;
import static android.Manifest.permission.WRITE_EXTERNAL_STORAGE;

import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.Menu;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.drawerlayout.widget.DrawerLayout;
/*import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.google.android.material.navigation.NavigationView;*/
public class MainActivity extends BridgeActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    if (checkPermission()) {
      //Toast.makeText(this, "Permisos concedidos", Toast.LENGTH_SHORT).show();
    } else {
      requestPermission();
    }
    //instance=this;
  }

  private boolean checkPermission() {
    int permission1 = ContextCompat.checkSelfPermission(getApplicationContext(), WRITE_EXTERNAL_STORAGE);
    int permission2 = ContextCompat.checkSelfPermission(getApplicationContext(), READ_EXTERNAL_STORAGE);
    int permission3 = ContextCompat.checkSelfPermission(getApplicationContext(), INTERNET);
    int permission4 = ContextCompat.checkSelfPermission(getApplicationContext(), MANAGE_EXTERNAL_STORAGE);

    return permission1 == PackageManager.PERMISSION_GRANTED && permission2 == PackageManager.PERMISSION_GRANTED && permission3==PackageManager.PERMISSION_GRANTED && permission4==PackageManager.PERMISSION_GRANTED;
  }

  private void requestPermission() {
    //permission
    ActivityCompat.requestPermissions(this, new String[]{WRITE_EXTERNAL_STORAGE, READ_EXTERNAL_STORAGE,INTERNET,MANAGE_EXTERNAL_STORAGE}, 1);
  }
}
//
