<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\{Role, Permission};
use Illuminate\Support\Facades\{Crypt};
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'admin',
            'hr',
            'tech-architect',
            'project-manager',
            'team-lead',
            'developer'
        ];

        $permissions = [
            'view-project'
        ];

        // foreach ($permissions as $permission) {
        //     Permission::create(['name' => $permission, 'guard_name' => 'api']);
        // }

        // foreach($roles as $role){
        //     Role::create(['name' => $role, 'guard_name' => 'api']);
        // }

        $role = Role::where('name','admin')->first();
        $permissions = Permission::get();
        $role->syncPermissions($permissions);
        $user = User::create([
            'name' => 'Arun',
            'email' => 'aruntm@mailinator.com',
            'password' => 'Qwert@12345',
            'original_password' => Crypt::encryptString('Qwert@12345'),
            'status' => 1,
        ]);

        $user->assignRole([$role]);
    }
}
